const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Generate sample data
function generateItems(n = 200) {
  const items = [];
  const start = Date.now() - n * 1000;
  for (let i = 1; i <= n; i++) {
    items.push({
      id: i,
      created_at: new Date(start + i * 1000).toISOString(),
      payload: { value: `item-${i}` }
    });
  }
  return items;
}

const ITEMS = generateItems(500);

// Helper to decode/encode cursor (base64 JSON)
function encodeCursor(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function decodeCursor(cursor) {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString());
  } catch (e) {
    return null;
  }
}

app.get('/', (req, res) => {
  res.send('<h3>Pagination Service Example</h3><p>See <code>/api/items?limit=50&cursor=&lt;token&gt;</code></p>');
});

// Cursor-based pagination endpoint
app.get('/api/items', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
  const cursor = req.query.cursor ? decodeCursor(req.query.cursor) : null;

  let startIndex = 0;
  if (cursor && cursor.id) {
    // find index after the cursor id
    const idx = ITEMS.findIndex(it => it.id === cursor.id);
    startIndex = idx >= 0 ? idx + 1 : 0;
  }

  const pageItems = ITEMS.slice(startIndex, startIndex + limit);

  const nextToken = pageItems.length
    ? encodeCursor({ id: pageItems[pageItems.length - 1].id })
    : null;

  res.json({ items: pageItems, nextPageToken: nextToken });
});

app.listen(PORT, () => console.log(`Pagination example listening on http://localhost:${PORT}`));
