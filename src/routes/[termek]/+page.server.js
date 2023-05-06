export const ssr = false;

let currentUser

export async function load({ locals, url }) {
	currentUser = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id);

	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${decodeURI(url.pathname.substring(1))}"`))
	};
}

export const actions = {
	addFav: async ({ request, locals }) => {
		let dbfavs = currentUser.favs;
		const data = await request.formData();
		const newFavObj = JSON.parse(data.get('newFav'));
		const keyToAdd = Object.keys(newFavObj)[0];

		if (keyToAdd && !dbfavs.hasOwnProperty(keyToAdd)) {
		 	dbfavs = { ...dbfavs, ...newFavObj };
		  	const updatedFavs = { "favs": dbfavs };
		  	locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, updatedFavs);
		}
	  }
}