CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name_ro TEXT NOT NULL,
  name_ru TEXT NOT NULL
);
INSERT OR IGNORE INTO tags (id, name_ro, name_ru) VALUES ('recommended', 'Recomandat', 'Хит');
ALTER TABLE items ADD COLUMN tag_id TEXT REFERENCES tags(id) ON DELETE SET NULL;
UPDATE items SET tag_id = 'recommended' WHERE tag = 'house';
