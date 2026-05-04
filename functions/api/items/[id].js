const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function onRequestPut({ request, env, params }) {
  try {
    const { id } = params;
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
      sort_order,
    } = body;

    if (!name_ro || !name_ru || price == null) {
      return Response.json(
        { error: 'name_ro, name_ru, and price are required' },
        { status: 400, headers: CORS }
      );
    }

    const db = env.DB;
    const fields = [
      'name_ro = ?',
      'name_ru = ?',
      'desc_ro = ?',
      'desc_ru = ?',
      'price = ?',
      'price_bottle = ?',
      'bottle_only = ?',
      'tag = ?',
      'image_url = ?',
      'subcategory_id = ?',
    ];
    const values = [
      name_ro,
      name_ru,
      desc_ro,
      desc_ru,
      price,
      price_bottle,
      bottle_only ? 1 : 0,
      tag,
      image_url,
      subcategory_id,
    ];

    if (category_id) {
      fields.push('category_id = ?');
      values.push(category_id);
    }

    if (sort_order != null) {
      fields.push('sort_order = ?');
      values.push(sort_order);
    }

    values.push(id);
    await db
      .prepare(`UPDATE items SET ${fields.join(', ')} WHERE id = ?`)
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
    await env.DB.prepare('DELETE FROM items WHERE id = ?').bind(id).run();
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
