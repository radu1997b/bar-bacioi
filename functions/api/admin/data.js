const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestGet({ env }) {
  try {
    const db = env.DB;

    const [catsResult, subsResult, itemsResult, tagsResult] = await Promise.all([
      db.prepare('SELECT * FROM categories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM subcategories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM items ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM tags ORDER BY name_ro ASC').all(),
    ]);

    return Response.json(
      {
        categories: catsResult.results,
        subcategories: subsResult.results,
        items: itemsResult.results,
        tags: tagsResult.results,
      },
      { headers: CORS }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
