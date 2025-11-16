# Pagination Service Example

Minimal Express example demonstrating cursor-based pagination.

Requirements
- Node.js (14+)

Install and run
```bash
cd examples/pagination-service
npm install
npm start
# opens on http://localhost:3000
```

Endpoints
- `GET /api/items?limit=50&cursor=<token>` — returns items and `nextPageToken` (base64 JSON). Use the `nextPageToken` as the `cursor` for subsequent requests.

Example
```bash
curl 'http://localhost:3000/api/items?limit=10'
```
