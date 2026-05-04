const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { name_ro, name_ru, blurb_ro = '', blurb_ru = '' } = body;

    if (!name_ro || !name_ru) {
      return Response.json({ error: 'name_ro and name_ru are required' }, { status: 400, headers: CORS });
    }

    const db = env.DB;
    const maxResult = await db.prepare('SELECT COALESCE(MAX(sort_order), 0) as m FROM categories').first();
    const sort_order = (maxResult?.m ?? 0) + 1;
    const id = crypto.randomUUID();

    await db
      .prepare(
        'INSERT INTO categories (id, name_ro, name_ru, blurb_ro, blurb_ru, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(id, name_ro, name_ru, blurb_ro, blurb_ru, sort_order)
      .run();

    return Response.json({ id }, { status: 201, headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
