export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/' || path === '/index.html') {
    try {
      const object = await env.IMAGES.get('index.html');
      if (object) {
        const html = await object.text();
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      }
    } catch {}
  }

  return next();
}
