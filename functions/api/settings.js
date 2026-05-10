const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestGet({ env }) {
  try {
    const rows = await env.DB.prepare('SELECT key, value FROM settings').all();
    const settings = Object.fromEntries(rows.results.map(r => [r.key, r.value]));
    return Response.json(settings, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestPut({ request, env }) {
  try {
    const body = await request.json();
    const db = env.DB;
    const stmts = Object.entries(body).map(([key, value]) =>
      db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind(key, String(value))
    );
    if (stmts.length) await db.batch(stmts);
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
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
