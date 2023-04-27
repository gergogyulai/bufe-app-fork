import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
	const record = await locals.pb.collection('users').getOne(locals.pb.authStore.baseModel.id);
	const recordString = JSON.stringify(record, 2);

	return {
		currentUser: JSON.parse(recordString)
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
	resetAvatar: async ({ locals }) => {
		try {
			const data = {"avatar": null}
			locals.pb.collection('users').update(locals.pb.authStore.baseModel.id, data);
		} catch (error) {
			console.log("Error", error)
			throw error(error.status, error.message)
		}
	},
	updateFavs: async ({ request, locals }) => {
		const data = await request.formData();
		console.log(data)
		try {
			await locals.pb.collection('users').update(locals.user.id, data);
		} catch (error){
			console.log('Error: ', error);
			throw error(error.status, error.message);
		}
	},
};