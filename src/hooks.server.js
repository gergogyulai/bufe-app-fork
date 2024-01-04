import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase('http://bufedb.gergo.cc');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	event.locals.pb.autoCancellation(false);

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname.startsWith('/api'))
		return await resolve(event);

	const anonRoutes = [ '/register', '/login', '/verify', '/change', '/offline', '/banned' ];

	if (!anonRoutes.some(route => event.url.pathname.startsWith(route) )) {
		if (!event.locals.pb.authStore.baseModel )  // Ha nincs bejelentkezve, redirect to login
			throw redirect(303, '/login');

		if (!event.locals.pb.authStore.baseModel.verified) // Ha nincs megerősítve, redirect to verify
			throw redirect(303, '/verify');
	}

	const protectedRoutes = [ '/admin' ];
	const admins = [ 'u1fy74rt1m48tx1', 'xkraxn39hbwzisz' ];

	// Ha a route protected és user nem admin redirect to '/'
	if (protectedRoutes.some(route => event.url.pathname.startsWith(route) )) {
		if (!admins.includes(event.locals.pb.authStore.baseModel.id))
			throw redirect(303, '/');
	}

	// Ha user bannolva van redirect
	if (event.locals.pb.authStore.baseModel?.tiltas
			&& !event.url.pathname.startsWith('/banned')
			&& !event.url.pathname.startsWith('/change')
			&& !event.url.pathname.startsWith('/profil')
	) throw redirect(303, '/banned');

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ sameSite: 'lax' }));

	return response;
}
