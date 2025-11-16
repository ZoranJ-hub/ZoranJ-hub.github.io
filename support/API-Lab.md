## API Lab — Develop and Test APIs

This folder contains documentation and examples that demonstrate my approach to building reliable, maintainable API integrations. The content is intended for engineering reviewers, support staff, and hiring managers who want to see concrete examples of production-grade API work.

Pages
- `index.html` — Landing page for the API Lab with an overview and links to project case studies.
- `api-resiliency-integration.html` — Case study: circuit breaker and resiliency patterns (Java / Spring Boot, Resilience4j).
- `api-pagination-implementation.html` — Case study: cursor-based pagination (Node.js / Express, PostgreSQL).
- `api-lob-integration.html` — Case study: Line-of-Business integration (webhooks, OAuth2, mapping).

Example Services
- `examples/pagination-service` — Runnable Express example implementing cursor-based pagination. See its `README.md` for instructions.

How to preview locally
1. Serve the site from the repository root:
```bash
python3 -m http.server 8000
# then open http://localhost:8000/support/api-lab/
```
2. Run the pagination example:
```bash
cd examples/pagination-service
npm install
npm start
# then open http://localhost:3000
```

Notes on deployment
- This repository is a user/organization GitHub Pages site and can be published from the `main` branch. I added a lightweight GitHub Actions workflow that validates HTML files on push and PRs; to enable GitHub Pages serving, confirm the Pages settings in the repository (Settings → Pages) — user sites are usually enabled automatically for `username.github.io` repositories.

If you'd like, I can:
- Scaffold runnable Spring Boot and LOB microservice examples.
- Add visual screenshots from monitoring (Grafana, logs) for the resiliency project.
- Convert diagrams to Mermaid and embed them directly into the HTML pages.
