import { fail } from '@sveltejs/kit';

export const ssr = false;

export async function load({ locals }) {
	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFullList()),
	};
}