const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestGet({ env }) {
  try {
    const result = await env.DB.prepare('SELECT * FROM tags ORDER BY name_ro ASC').all();
    return Response.json(result.results, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const { name_ro, name_ru } = await request.json();
    if (!name_ro || !name_ru) {
      return Response.json({ error: 'name_ro and name_ru are required' }, { status: 400, headers: CORS });
    }
    const id = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO tags (id, name_ro, name_ru) VALUES (?, ?, ?)')
      .bind(id, name_ro, name_ru)
      .run();
    return Response.json({ id, name_ro, name_ru }, { status: 201, headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { ...CORS, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });
}
