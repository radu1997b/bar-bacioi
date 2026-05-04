const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestPut({ request, env, params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name_ro, name_ru, sort_order } = body;

    if (!name_ro || !name_ru) {
      return Response.json({ error: 'name_ro and name_ru are required' }, { status: 400, headers: CORS });
    }

    const db = env.DB;
    const fields = ['name_ro = ?', 'name_ru = ?'];
    const values = [name_ro, name_ru];

    if (sort_order != null) {
      fields.push('sort_order = ?');
      values.push(sort_order);
    }

    values.push(id);
    await db
      .prepare(`UPDATE subcategories SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return Response.json({ ok: true }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestDelete({ env, params }) {
  try {
    const { id } = params;
    await env.DB.prepare('DELETE FROM subcategories WHERE id = ?').bind(id).run();
    return Response.json({ ok: true }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
