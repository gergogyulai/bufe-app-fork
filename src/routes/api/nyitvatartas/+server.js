export async function GET({ locals, fetch }) {
    const record = await locals.pb.collection('nyitvatartas').getOne('aj5ohkt2ciejnay');

    const recordString = JSON.stringify(record, null, 2);

	return new Response(recordString, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}