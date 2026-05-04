CREATE TABLE IF NOT EXISTS published_menu (
  id TEXT PRIMARY KEY DEFAULT 'current',
  data TEXT NOT NULL,
  published_at TEXT NOT NULL
);
