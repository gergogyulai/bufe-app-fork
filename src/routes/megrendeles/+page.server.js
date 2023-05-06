import { fail } from '@sveltejs/kit';
import { szunetCalc } from '$lib/utils';

export const ssr = false;

export async function load({ locals }) {
	const nyitvatartasData = await locals.pb.collection('nyitvatartas').getOne('aj5ohkt2ciejnay')

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList(1, {})), 
		// atveteliOpciok: szunetCalc(nyitvatartasData),
		atveteliOpciok: [ {value: '1.szunet', label: '1. szünet (8:45-8:55)'}],
		nyitvatartasData: JSON.stringify(nyitvatartasData, null, 2)
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const rendeles = JSON.parse(data.rendeles);
		let total = 0;

		for (const termek of Object.keys(rendeles)) {
			for (const i in rendeles[termek]) {
				const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`);

				// Validálás
				const darab = rendeles[termek][i].darab;
				let subTotal = darab * record.ar;
				const feltet = rendeles[termek][i].feltet.map((feltet => { subTotal += Number(record.feltetek[feltet].ar); return feltet; }));
				rendeles[termek][i] = { 'ar': subTotal, darab, feltet };
				total += subTotal;

				if (record.darab - darab >= 0)
					await locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab, 'vasarlasok': record.vasarlasok + darab } );	// darabszam kivonasa, vásárlás szám növelése
				else
					return fail(409, { 'error': `Túl sok ${record.termek} a kosárban!`, 'sok': record.termek });
			}
		}

		await locals.pb.collection('rendelesek').create({
			'rendelo': locals.pb.authStore.baseModel.id,
			'termekek': rendeles,
			total,
			'status': 'fuggoben',
			'name': locals.pb.authStore.baseModel.name,
			'paymentMethod': data.paymentMethod,
			'atveteliIdo': data.atveteliIdo
		});
	}
};