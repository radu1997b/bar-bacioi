const CORS = {
  'Access-Control-Allow-Origin': '*',
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file provided' }, { status: 400, headers: CORS });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ error: 'Only JPEG, PNG and WebP images are allowed' }, { status: 400, headers: CORS });
    }
    if (file.size > MAX_BYTES) {
      return Response.json({ error: 'File exceeds 5 MB limit' }, { status: 400, headers: CORS });
    }

    const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
    const key = `items/${crypto.randomUUID()}.${ext}`;

    await env.IMAGES.put(key, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return Response.json({ url: `/api/images/${key}` }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { ...CORS, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });
}
