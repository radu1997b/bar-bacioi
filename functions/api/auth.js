const CORS = {
  'Content-Type': 'application/json',
};

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    if (k) cookies[k.trim()] = v.join('=').trim();
  });
  return cookies;
}

function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

// POST /api/auth — login
export async function onRequestPost({ request, env }) {
  try {
    const { password } = await request.json();
    const expected = env.ADMIN_PASSWORD;

    if (!expected) {
      return Response.json(
        { error: 'ADMIN_PASSWORD not configured' },
        { status: 500, headers: CORS },
      );
    }

    if (!password || password !== expected) {
      return Response.json(
        { error: 'Parolă incorectă' },
        { status: 401, headers: CORS },
      );
    }

    const token = generateToken();
    const now = new Date().toISOString();

    await env.DB.prepare(
      'INSERT INTO admin_sessions (token, created_at) VALUES (?, ?)'
    ).bind(token, now).run();

    // Clean sessions older than 7 days
    await env.DB.prepare(
      "DELETE FROM admin_sessions WHERE created_at < datetime('now', '-7 days')"
    ).run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        ...CORS,
        'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 3600}`,
      },
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

// DELETE /api/auth — logout
export async function onRequestDelete({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  const token = cookies.admin_token;

  if (token) {
    await env.DB.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      ...CORS,
      'Set-Cookie': 'admin_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
    },
  });
}

// GET /api/auth — check session
export async function onRequestGet({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  const token = cookies.admin_token;

  if (!token) {
    return Response.json({ authenticated: false }, { headers: CORS });
  }

  const row = await env.DB.prepare(
    'SELECT token FROM admin_sessions WHERE token = ?'
  ).bind(token).first();

  return Response.json({ authenticated: !!row }, { headers: CORS });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
