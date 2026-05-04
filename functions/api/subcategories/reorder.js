const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestPost({ request, env }) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return Response.json({ error: 'ids array required' }, { status: 400, headers: CORS });
    }
    const stmts = ids.map((id, i) =>
      env.DB.prepare('UPDATE subcategories SET sort_order = ? WHERE id = ?').bind(i, id)
    );
    await env.DB.batch(stmts);
    return Response.json({ ok: true }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
