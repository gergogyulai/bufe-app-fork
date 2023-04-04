export async function GET({ locals, fetch, url }) {
    const id = url.searchParams.get('termek');
    const record = await locals.pb.collection('termekek').getOne(id);
    let foto;

    if (record.foto) {
        foto = await fetch(`http://127.0.0.1:8090/api/files/termekek/${id}/${record.foto}`);
    } else {
        const placeholderImg = await fetch('https://generative-placeholders.glitch.me/image?width=400&height=400&style=joy-division');
        return new Response(await placeholderImg.blob(), {
            headers: {
                'Content-Type': 'image/*'
            }
        });
    }

    return new Response(await foto.blob(), {
        headers: {
            'Content-Type': 'image/*'
        }
    });
}