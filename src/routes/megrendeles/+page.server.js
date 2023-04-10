import { fail } from '@sveltejs/kit';

export const ssr = false;
let atveteliOpciok = [];

export async function load({ locals }) {
	const now = new Date();
	const elsoSzunet = new Date().setHours(8, 45, 0, 0);
	const masodikSzunet = new Date().setHours(9, 40, 0, 0);
	const harmadikSzunet = new Date().setHours(10, 35, 0, 0);
	const negyedikSzunet = new Date().setHours(11, 30, 0, 0);
	const ebedSzunet = new Date().setHours(12, 25, 0, 0);
	const hatodikSzunet = new Date().setHours(13, 30, 0, 0);
	const zaras  = new Date().setHours(14, 0, 0, 0);

	if (now < elsoSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '1.szunet', label: '1. szünet (8:45-8:55)'},
			{value: '2.szunet', label: '2. szünet (9:40-9:50)'},
			{value: '3.szunet', label: '3. szünet (10:35-10:45)'},
			{value: '4.szunet', label: '4. szünet (11:30-11:40)'},
			{value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < masodikSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '2.szunet', label: '2. szünet (9:40-9:50)'},
			{value: '3.szunet', label: '3. szünet (10:35-10:45)'},
			{value: '4.szunet', label: '4. szünet (11:30-11:40)'},
			{value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < harmadikSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '3.szunet', label: '3. szünet (10:35-10:45)'},
			{value: '4.szunet', label: '4. szünet (11:30-11:40)'},
			{value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < negyedikSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '4.szunet', label: '4. szünet (11:30-11:40)'},
			{value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < ebedSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '5.szunet', label: 'Ebédszünet (12:25-12:45)'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < hatodikSzunet) {
		atveteliOpciok = [
			{value: 'Most', label: 'Most'},
			{value: '6.szunet', label: '6. szünet (13:30-13:35)'}];
	} else if (now < zaras){
		atveteliOpciok = [];
	}

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList(1, {})), atveteliOpciok
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