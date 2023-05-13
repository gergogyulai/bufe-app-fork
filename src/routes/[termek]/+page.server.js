export const ssr = false;

export async function load({ locals, url }) {
	return {
		'termekek': structuredClone(await locals.pb.collection('termekek').getFirstListItem(`termek = "${decodeURI(url.pathname.substring(1))}"`))
	};
}