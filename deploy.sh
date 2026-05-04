#!/bin/bash
set -e

DB_NAME="bar-bacioi-menu"
R2_BUCKET="bar-bacioi-images"
PROJECT_NAME="bar-bacioi"

echo "=== Bar Bacioi — Cloudflare Deploy ==="

# Check wrangler
if ! command -v wrangler &> /dev/null; then
  echo ">> Installing wrangler..."
  npm install -g wrangler@4
fi

# Check login
if wrangler whoami 2>&1 | grep -qi "not authenticated"; then
  echo ">> Logging in to Cloudflare..."
  wrangler login
fi

# --- D1 Database ---
echo ""
echo ">> Checking D1 database '$DB_NAME'..."
DB_ID=$(wrangler d1 list --json 2>/dev/null | grep -B2 "\"$DB_NAME\"" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1 || true)

if [ -z "$DB_ID" ]; then
  echo "   Creating D1 database..."
  CREATE_OUTPUT=$(wrangler d1 create "$DB_NAME" 2>&1)
  DB_ID=$(echo "$CREATE_OUTPUT" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)
  if [ -z "$DB_ID" ]; then
    echo "ERROR: Could not extract database ID."
    echo "$CREATE_OUTPUT"
    exit 1
  fi
  echo "   Created! ID: $DB_ID"
else
  echo "   Already exists. ID: $DB_ID"
fi

# Update wrangler.toml with real database ID
CURRENT_ID=$(grep 'database_id' wrangler.toml | sed 's/.*= *"//' | sed 's/"//')
if [ "$CURRENT_ID" != "$DB_ID" ]; then
  sed -i '' "s|database_id = \"$CURRENT_ID\"|database_id = \"$DB_ID\"|" wrangler.toml
  echo "   Updated wrangler.toml with database ID."
fi

# --- R2 Bucket ---
echo ""
echo ">> Checking R2 bucket '$R2_BUCKET'..."
if wrangler r2 bucket list 2>/dev/null | grep -q "$R2_BUCKET"; then
  echo "   Already exists."
else
  echo "   Creating R2 bucket..."
  wrangler r2 bucket create "$R2_BUCKET"
  echo "   Created!"
fi

# --- Database schema & seed ---
echo ""
echo ">> Running schema.sql..."
wrangler d1 execute "$DB_NAME" --remote --file=schema.sql --yes

echo ">> Running seed.sql..."
wrangler d1 execute "$DB_NAME" --remote --file=seed.sql --yes

if [ -f migration-add-images.sql ]; then
  echo ">> Running migration-add-images.sql..."
  wrangler d1 execute "$DB_NAME" --remote --file=migration-add-images.sql --yes 2>/dev/null || echo "   Skipped (column may already exist)."
fi

if [ -f migration-tags.sql ]; then
  echo ">> Running migration-tags.sql..."
  wrangler d1 execute "$DB_NAME" --remote --file=migration-tags.sql --yes 2>/dev/null || echo "   Skipped (columns may already exist)."
fi

if [ -f migration-published-menu.sql ]; then
  echo ">> Running migration-published-menu.sql..."
  wrangler d1 execute "$DB_NAME" --remote --file=migration-published-menu.sql --yes 2>/dev/null || echo "   Skipped (table may already exist)."
fi

# --- Deploy ---
echo ""
echo ">> Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name="$PROJECT_NAME"

echo ""
echo "=== Deploy complete! ==="
