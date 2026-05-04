const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const formatItem = (row) => {
  const out = {
    id: row.id,
    name: { ro: row.name_ro, ru: row.name_ru },
    desc: { ro: row.desc_ro, ru: row.desc_ru },
    price: row.price,
  };
  if (row.price_bottle != null) out.priceBottle = row.price_bottle;
  if (row.bottle_only) out.bottleOnly = true;
  if (row.tag) out.tag = row.tag;
  if (row.image_url) out.image_url = row.image_url;
  return out;
};

export async function onRequestPost({ env }) {
  try {
    // Build menu from DB
    const db = env.DB;
    const [catsResult, subsResult, itemsResult] = await Promise.all([
      db.prepare('SELECT * FROM categories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM subcategories ORDER BY sort_order ASC').all(),
      db.prepare('SELECT * FROM items ORDER BY sort_order ASC').all(),
    ]);

    const categories = catsResult.results;
    const subcategories = subsResult.results;
    const items = itemsResult.results;

    const menu = categories.map((cat) => {
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
          items: items.filter((i) => i.subcategory_id === sub.id).map(formatItem),
        }));
      } else {
        entry.items = items
          .filter((i) => i.category_id === cat.id && !i.subcategory_id)
          .map(formatItem);
      }
      return entry;
    });

    // Fetch the HTML template via the ASSETS binding
    const templateRes = await env.ASSETS.fetch('http://localhost/index.html');
    if (!templateRes.ok) {
      return Response.json({ error: 'Could not read index.html template' }, { status: 500, headers: CORS });
    }
    let html = await templateRes.text();

    // Inject menu data at the marker, replacing it
    const injection = `<script>window.MENU_DATA=${JSON.stringify(menu)};window.MENU_STATIC=true;</script>`;
    html = html.replace('<!-- __MENU_DATA__ -->', injection);

    // Save the generated HTML to R2
    await env.IMAGES.put('index.html', html, {
      httpMetadata: { contentType: 'text/html; charset=utf-8' },
    });

    return Response.json({ ok: true, categories: menu.length }, { headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { ...CORS, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });
}
