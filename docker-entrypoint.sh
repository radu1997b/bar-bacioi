#!/bin/sh
set -e

INIT_MARKER=".wrangler/.db-initialized"

if [ ! -f "$INIT_MARKER" ]; then
  echo ">>> First run: initializing local D1 database..."
  wrangler d1 execute bar-bacioi-menu --local --file=schema.sql
  wrangler d1 execute bar-bacioi-menu --local --file=seed.sql
  mkdir -p .wrangler
  touch "$INIT_MARKER"
  echo ">>> Database ready."
else
  echo ">>> Applying migrations..."
  wrangler d1 execute bar-bacioi-menu --local --file=migration-add-images.sql 2>/dev/null || true
fi

echo ">>> Starting dev server → http://localhost:8788"
exec wrangler pages dev . --port 8788 --ip 0.0.0.0
