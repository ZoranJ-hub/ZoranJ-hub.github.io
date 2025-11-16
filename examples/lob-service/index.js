const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

// Simple in-memory queue
const JOBS = [];

app.post('/webhook/orders', async (req, res) => {
  const payload = req.body;
  if (!payload || !payload.order) return res.status(400).json({ error: 'invalid payload' });

  const idempotencyKey = req.headers['x-idempotency-key'] || uuidv4();
  JOBS.push({ id: idempotencyKey, payload });
  // simulate async processing
  process.nextTick(() => processJob({ id: idempotencyKey, payload }));
  res.status(202).json({ status: 'accepted', jobId: idempotencyKey });
});

async function processJob(job) {
  try {
    const token = await getAccessToken();
    const mapped = mapToLobModel(job.payload);
    // Example outbound call to LOB API
    await axios.post(process.env.LOB_API || 'https://example.com/lob/sync', mapped, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('job success', job.id);
  } catch (err) {
    console.error('job failed', job.id, err.message || err);
    // In production, push to dead-letter queue or retry with backoff
  }
}

async function getAccessToken() {
  // Minimal stub: in a real app call OAuth token endpoint
  return 'fake-token-for-demo';
}

function mapToLobModel(source) {
  return {
    customerRef: source.customer?.id || null,
    orderRef: source.order?.id || null,
    amount: (source.order?.total_cents || 0) / 100.0,
    items: (source.order?.items || []).map(i => ({ sku: i.sku, qty: i.qty }))
  };
}

app.get('/', (req, res) => res.send('<h3>LOB Service Example</h3><p>POST to /webhook/orders</p>'));

app.listen(PORT, () => console.log(`LOB example listening on http://localhost:${PORT}`));
