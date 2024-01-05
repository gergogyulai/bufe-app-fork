import { fail } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	let total = 0;
	for (const rendeles of elozmenyLista) {
		if (rendeles.status === 'kesz')
			for (const termek of Object.keys(rendeles.termekek)) {
				for (const x of rendeles.termekek[termek]) {
					total += x.ar;
				}
			}
	}

	return {
		elozmenyLista,
		total,
		pathname: url.pathname
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const id = JSON.parse(data.recordID);
		const rendeles = await locals.pb.collection('rendelesek').getOne(id);

		if (rendeles.status === 'fuggoben' ) {
			for (const termek of Object.keys(rendeles.termekek)) {
				const record = await locals.pb.collection('termekek').getFirstListItem(`termek = '${termek}'`);

				let vasarlasok = record.vasarlasok;

				for (const x of rendeles.termekek[termek]) {
					vasarlasok -= x.darab;
				}

				await locals.pb.collection('termekek').update(record.id, { vasarlasok }); // visszaállítja a termék vásárlás számlálót és a rendelkezésre álló termékek számát.
			}
		}

		else if (rendeles.status === 'folyamatban')
			return fail(409, { 'error': 'Ezt a rendlést már nem lehet törölni!' });

		await locals.pb.collection('rendelesek').delete(id);
	}
};