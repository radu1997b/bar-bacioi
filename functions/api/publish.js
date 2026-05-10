const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

function buildMenu(categories, subcategories, items, tagsMap) {
  const formatItem = (row) => {
    const out = {
      id: row.id,
      name: { ro: row.name_ro, ru: row.name_ru },
      desc: { ro: row.desc_ro, ru: row.desc_ru },
      price: row.price,
    };
    if (row.price_bottle != null) out.priceBottle = row.price_bottle;
    if (row.bottle_only) out.bottleOnly = true;
    const tag = row.tag_id ? tagsMap[row.tag_id] : null;
    if (tag) out.tag = { ro: tag.name_ro, ru: tag.name_ru };
    if (row.image_url) out.image_url = row.image_url;
    if (row.weight) out.weight = row.weight;
    return out;
  };

  return categories.map((cat) => {
    const catSubs = subcategories.filter((s) => s.category_id === cat.id);
    const entry = {
      id: cat.id,
      name: { ro: cat.name_ro, ru: cat.name_ru },
      blurb: { ro: cat.blurb_ro, ru: cat.blurb_ru },
    };

    if (catSubs.length > 0) {
      entry.subs = catSubs.map((sub) => ({
        id: sub.id,
        name: { ro: sub.name_ro, ru: sub.name_ru },
        items: items
          .filter((i) => i.subcategory_id === sub.id)
          .map(formatItem),
      }));
    } else {
      entry.items = items
        .filter((i) => i.category_id === cat.id && !i.subcategory_id)
        .map(formatItem);
    }

    return entry;
  });
}

export async function onRequestGet({ env }) {
  try {
    const row = await env.DB.prepare(
      "SELECT data, published_at FROM published_menu WHERE id = 'current'"
    ).first();

    if (!row) {
      return Response.json({ published: false }, { headers: CORS });
    }

    const parsed = JSON.parse(row.data);
    // Support both old format (array) and new format ({ menu, settings })
    const menu = Array.isArray(parsed) ? parsed : parsed.menu;
    const settings = Array.isArray(parsed) ? {} : (parsed.settings || {});

    return Response.json({
      published: true,
      menu,
      settings,
      published_at: row.published_at,
    }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestPost({ env }) {
  try {
    const db = env.DB;

    const [catsResult, subsResult, itemsResult, tagsResult, settingsResult] = await Promise.all([
      db.prepare('SELECT * FROM categories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM subcategories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM items ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM tags').all(),
      db.prepare('SELECT key, value FROM settings').all(),
    ]);

    const tagsMap = Object.fromEntries(tagsResult.results.map(t => [t.id, t]));
    const settings = Object.fromEntries(settingsResult.results.map(r => [r.key, r.value]));
    const menu = buildMenu(
      catsResult.results,
      subsResult.results,
      itemsResult.results,
      tagsMap,
    );

    const now = new Date().toISOString();
    const payload = JSON.stringify({ menu, settings });
    await db.prepare(
      "INSERT OR REPLACE INTO published_menu (id, data, published_at) VALUES ('current', ?, ?)"
    ).bind(payload, now).run();

    return Response.json({ ok: true, published_at: now }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
