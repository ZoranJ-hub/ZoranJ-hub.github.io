# LOB Service Example

Minimal Node.js microservice illustrating a webhook receiver, job processing, and an OAuth2 token stub used to call a Line-of-Business (LOB) API.

Requirements
- Node.js 14+

Run
```bash
cd examples/lob-service
npm install
npm start
# POST sample payload:
curl -X POST http://localhost:4000/webhook/orders -H 'Content-Type: application/json' -d '{"order": {"id": "o1", "total_cents": 1234, "items": [{"sku":"x","qty":1}]}, "customer": {"id":"c1"}}'
```

Notes
- This example is intentionally simple and suitable for demonstration and learning. Replace the `getAccessToken` stub with a real OAuth2 client for production usage.
