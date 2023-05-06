import { error, redirect } from "@sveltejs/kit";

let currentUser

export async function load({ locals }) {
	const record = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id);
	currentUser = JSON.parse(JSON.stringify(record, 2));

	const elozmenyLista = structuredClone(await locals.pb.collection('rendelesek').getFullList(1, {
		filter: `rendelo = "${locals.pb.authStore.baseModel.id}"`,
		sort: '-created'
	}));

	let total = 0;

	Object.keys(elozmenyLista).forEach(rendeles => {
		if (elozmenyLista[rendeles].status === 'kesz')
			Object.keys(elozmenyLista[rendeles].termekek).forEach(termek => {
				total += elozmenyLista[rendeles].termekek[termek].ar;
			});
	});

	return {
		currentUser,
		elozmenyLista,
		total
	};
}

export const actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
	},
	changeAvatar: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
		} catch (error) {
			console.log("Error", error)
			throw error(error.status, error.message)
		}
	},
	resetAvatar: async ({ locals }) => {
		const data = {"avatar": null}
		locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
	},
	changePassword: async ({ request, locals }) => {
		const formData = await request.formData();
		console.log(formData)
		try {
			await locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, formData);
			locals.pb.authStore.clear();
			throw redirect(303, '/login');
		} catch (error){
			console.log('Error: ', error);
			throw error(error.status, error.message);
		}
	},
	removeFav: async ({ request, locals }) => {
		let dbfavs = currentUser.favs;
		const data = await request.formData();
		const favToRemove = data.get('removedFav');
		
		if (favToRemove && dbfavs.hasOwnProperty(favToRemove)) {
		  	delete dbfavs[favToRemove];
		  	const updatedFavs = { "favs": dbfavs };
		  	locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, updatedFavs);
		}
	}
};