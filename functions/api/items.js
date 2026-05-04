const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const {
      category_id,
      subcategory_id = null,
      name_ro,
      name_ru,
      desc_ro = '',
      desc_ru = '',
      price,
      price_bottle = null,
      bottle_only = 0,
      tag = null,
      image_url = null,
    } = body;

    if (!category_id || !name_ro || !name_ru || price == null) {
      return Response.json(
        { error: 'category_id, name_ro, name_ru, and price are required' },
        { status: 400, headers: CORS }
      );
    }

    const db = env.DB;
    const maxResult = await db
      .prepare('SELECT COALESCE(MAX(sort_order), 0) as m FROM items WHERE category_id = ?')
      .bind(category_id)
      .first();
    const sort_order = (maxResult?.m ?? 0) + 1;
    const id = crypto.randomUUID();

    await db
      .prepare(
        `INSERT INTO items
          (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru,
           price, price_bottle, bottle_only, tag, image_url, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        category_id,
        subcategory_id,
        name_ro,
        name_ru,
        desc_ro,
        desc_ru,
        price,
        price_bottle,
        bottle_only ? 1 : 0,
        tag,
        image_url,
        sort_order
      )
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
