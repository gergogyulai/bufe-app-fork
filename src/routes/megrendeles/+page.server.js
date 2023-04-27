import { fail } from '@sveltejs/kit';
import { szunetCalc } from '$lib/utils';

export const ssr = false;

export async function load({ locals }) {
	const nyitvatartasData = await locals.pb.collection('nyitvatartas').getOne('aj5ohkt2ciejnay')

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList(1, {})), 
		atveteliOpciok: szunetCalc(nyitvatartasData)
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const rendeles = JSON.parse(data.rendeles);
		const paymentMethod = data.paymentMethod;
		const atveteliIdo = data.atveteliIdo;
		let total = 0;

		for (const termek in rendeles) {
			const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${termek}"`);
			// ar validalas
			const darab = rendeles[termek].darab;
			let subTotal = darab * record.ar;
			const feltet = rendeles[termek].feltet.map((feltet => { subTotal += Number(record.feltetek[feltet].ar); return feltet; }));

			rendeles[termek] = { 'ar': subTotal, darab, feltet };
			total += subTotal;

			if (record.darab - darab >= 0)
				await locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab } ); // darabszam kivonasa
			else
				return fail(409, { 'error': `Túl sok ${record.termek} a kosárban!`, 'sok': record.termek });
		}

		await locals.pb.collection('rendelesek').create({ 'rendelo': locals.pb.authStore.baseModel.id, 'termekek': rendeles, total, 'status': 'fuggoben', 'name': locals.pb.authStore.baseModel.name, paymentMethod, atveteliIdo });
	}
};