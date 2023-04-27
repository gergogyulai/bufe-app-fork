export const ssr = false;

export async function load({ locals, url }) {
	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${decodeURI(url.pathname.substring(1))}"`))
	};
}

export const actions = {
	addFav: async ({ request, locals }) => {
		const data = await request.formData();
		locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
	}
}