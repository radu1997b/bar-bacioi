function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    if (k) cookies[k.trim()] = v.join('=').trim();
  });
  return cookies;
}

// Public routes that don't require auth
const PUBLIC_PATHS = [
  '/api/publish',   // GET — public menu
  '/api/menu',      // GET — legacy public menu
  '/api/images/',   // GET — image serving
  '/api/auth',      // auth endpoints themselves
];

function isPublic(url, method) {
  const path = new URL(url).pathname;

  // Non-API routes (static files, admin HTML) are always public
  if (!path.startsWith('/api/')) return true;

  // Auth endpoints are always accessible
  if (path === '/api/auth') return true;

  // Public GET endpoints
  if (method === 'GET' && PUBLIC_PATHS.some(p => path.startsWith(p))) return true;

  return false;
}

export async function onRequest({ request, next, env }) {
  if (isPublic(request.url, request.method)) {
    return next();
  }

  // Check admin session
  const cookies = parseCookies(request.headers.get('Cookie'));
  const token = cookies.admin_token;

  if (!token) {
    return Response.json(
      { error: 'Neautorizat' },
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const row = await env.DB.prepare(
    'SELECT token FROM admin_sessions WHERE token = ?'
  ).bind(token).first();

  if (!row) {
    return Response.json(
      { error: 'Sesiune expirată' },
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return next();
}
