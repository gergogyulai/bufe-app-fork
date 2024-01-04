// import { PUSH_PRIVATE_KEY, PUSH_PUBLIC_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import webpush from 'web-push';
import sharp from 'sharp';
import { szunet } from '$lib/backendUtils/szunetSzamolo';

process.on('uncaughtException', function (err) {
	console.error(err);
	console.log('Node NOT Exiting...');
});

export const ssr = false;

//webpush.setVapidDetails('mailto:szabot2@kkszki.hu', PUSH_PUBLIC_KEY, PUSH_PRIVATE_KEY);

export async function load({ locals }) {
	return {
		felhasznalokLista: structuredClone(await locals.pb.collection('users').getFullList({ sort: '+created' })),
		banLista: structuredClone(await locals.pb.collection('tiltottak').getFullList({ sort: '+created' })),
		termekekLista: structuredClone(await locals.pb.collection('termekek').getFullList({ sort: '+termek' })),
		rendelesek: {
			fuggoben: structuredClone(await locals.pb.collection('rendelesek').getFullList({ filter: 'status = "fuggoben"' })),
			kesz: structuredClone(await locals.pb.collection('rendelesek').getFullList({ filter: 'status = "folyamatban"' }))
		},
		szunetArray: szunet()
	};
}

export const actions = {
	ban: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const user = await locals.pb.collection('users').getOne(data.id);

		if (user.id === 'u1fy74rt1m48tx1' || user.id === 'xkraxn39hbwzisz' )  // Az admin profil ne tudja bannolni magát
			throw redirect(303, '/admin');

		const banRecord = await locals.pb.collection('tiltottak').create({ email: user.email, user: user.id });
		await locals.pb.collection('users').update(data.id, { tiltas: banRecord.id });
	},
	unban: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const banRecord = await locals.pb.collection('tiltottak').getFirstListItem(`email = "${data.email.trim()}"`);

		await locals.pb.collection('tiltottak').delete(banRecord.id);
	},
	foto: async ({ request, locals }) => {
		const data = await request.formData();

		for (const foto of data) {
			const image = foto[1];
			const id = foto[0];

			if (image.size) {
				const optimizedImage = await sharp(await image.arrayBuffer()).resize(600, 600).avif({ effort: 4, chromaSubsampling: '4:2:0' }).toBuffer();

				const formData = new FormData();
				formData.append('foto', new Blob([ optimizedImage ]));

				await locals.pb.collection('termekek').update(id, formData);
			}
		}
	},
	darab: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'darab': data[id] });
		});
	},
	ar: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'ar': data[id] });
		});
	},
	termekek: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		data.add = JSON.parse(data.add);
		data.remove = JSON.parse(data.remove);

		Object.keys(data.add).forEach(termek => {
			locals.pb.collection('termekek').create({ termek, 'ar': data.add[termek].ar, 'darab': data.add[termek].darab, 'leiras': data.add[termek].leiras, 'kategoria': data.add[termek].kategoria });
		});

		data.remove.forEach(id => {
			locals.pb.collection('termekek').delete(id);
		});
	},
	leiras: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'leiras': data[id] });
		});
	},
	feltet: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		data.add = JSON.parse(data.add);
		data.remove = JSON.parse(data.remove);

		for (const id in data.add) {
			for (const feltet in data.add[id]) {
				const record = await locals.pb.collection('termekek').getOne(id);

				await locals.pb.collection('termekek').update(id, { 'feltetek': { ...record.feltetek, [feltet]: { 'ar': data.add[id][feltet].ar, 'darab': data.add[id][feltet].darab } } });
			}
		}

		for (const id in data.remove) {
			const record = await locals.pb.collection('termekek').getOne(id);
			data.remove[id].forEach(feltet => { delete record.feltetek[feltet]; });
			if (JSON.stringify(record.feltetek) === '{}') record.feltetek = null;

			await locals.pb.collection('termekek').update(id, { 'feltetek': record.feltetek });
		}
	},
	kategoria: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		Object.keys(data).forEach(id => {
			locals.pb.collection('termekek').update(id, { 'kategoria': data[id] });
		});
	},
	// -----------------------------------------------------------------------------------------------------
	kesz: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);
		const rendeles = await locals.pb.collection('rendelesek').getOne(id);
		const pushList = await locals.pb.collection('push').getFullList(1, { filter: `name = "${rendeles.rendelo}"` });

		await locals.pb.collection('rendelesek').update(id, { 'status': 'folyamatban' });

		for (const pushSubscriber of pushList) {
			webpush.sendNotification(pushSubscriber.subscription, JSON.stringify({
				title: 'A rendelésed átvehető!', options: { body: 'Vedd át amíg meleg.', icon: 'favicon.png' }
			}));
		}
	},
	atadva: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);

		await locals.pb.collection('rendelesek').update(id, { 'status': 'kesz' });
	},
	torles: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);
		const rendeles = await locals.pb.collection('rendelesek').getOne(id);

		Object.keys(rendeles.termekek).forEach(async termek => {
			const record = await locals.pb.collection('termekek').getFirstListItem(`termek = '${termek}'`);
			let darab = record.darab;

			for (const x of rendeles.termekek[termek]) {
				darab += x.darab;
			}

			await locals.pb.collection('termekek').update(record.id, { darab });
		});

		await locals.pb.collection('rendelesek').update(id, { 'status': 'torolve' });
	}
};
