CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_ro TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  blurb_ro TEXT NOT NULL DEFAULT '',
  blurb_ru TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name_ro TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  subcategory_id TEXT REFERENCES subcategories(id) ON DELETE SET NULL,
  name_ro TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  desc_ro TEXT NOT NULL DEFAULT '',
  desc_ru TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  price_bottle INTEGER,
  bottle_only INTEGER NOT NULL DEFAULT 0,
  tag TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
