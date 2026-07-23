# Cloudflare & Edge Computing Mastery (20-Week Roadmap)

A hands-on, project-based mastery plan focused on the **Cloudflare Stack** (Workers, Durable Objects, D1, R2, Queues, Workflows, Hyperdrive, Containers, and Browser Rendering).

This repository serves as a combined **Knowledge Base (Obsidian Vault)**, **Content Creation Hub** (case studies, articles, social posts), and **Monorepo** for all projects built during the 20-week roadmap.

---

## 🎯 Goals & Strategy

- **Specialization:** Master advanced Cloudflare patterns (DO hibernation, edge state sync, Hyperdrive latency optimization, edge A/B testing, sandboxing).
- **Public Proof-of-Work:** Build and deploy every project to a real subdomain on `alisanan.site`.
- **Content & Authority:** Write case studies, engineering blogs, and public build logs on X and LinkedIn for every chapter.
- **Accountability:** Weekly check-ins with Sohaib + public build posts.

---

## 🚦 AI Assistance Rules

To ensure genuine technical depth, every chapter follows one of two strict execution modes:

- 🔴 **UNASSISTED:** Core business logic and system design written manually without AI code generation. AI is restricted to conceptual Q&A.
- 🟡 **AI-PAIRED:** AI can generate boilerplate, layouts, or integrations, but every single line of code must be fully understood and explainable. Frontend/UI (Kumo, Fluent, HeroUI) is always 🟡.

---

## 🗺️ Roadmap Overview & Status

### Phase 1 — Foundations & Core Edge Mechanics (Weeks 1–7)
- [ ] **Week 1 — Performance Profiling & Observability 🔴 (WIP)**
  - [x] CPU time vs wall time limits, where Workers actually spend time
  - [ ] Workers Observability / structured logging
  - [ ] Tail Workers for centralized logging
  - [ ] Reading and interpreting a flame graph / trace
  - *Project:* Profile and optimize an existing Worker with documented before/after metrics.
- [ ] **Week 2 — Durable Objects, Done Right 🔴**
  - Hibernation API, WebSocket connection lifecycle, SQLite-backed DO storage.
  - *Project:* `do-demo.alisanan.site` (Real-time counter / presence).
- [ ] **Weeks 3–7 — Flagship Rebuild: TurboSync v2**
  - Week 3 🔴: Sync engine redesign & clock sync.
  - Week 4 🟡: D1 schema (Drizzle), auth & role-based permissions.
  - Week 5 🟡: UX + YouTube/Vimeo player abstractions.
  - Week 6 🟡: R2 uploads + final polish (`sync.alisanan.site`).
  - Week 7 🟡: RealtimeKit voice chat integration.

### Phase 2 — Edge Systems & Distributed Logic (Weeks 8–12)
- [ ] **Weeks 8–9 — Edge Uptime & Status Monitor 🔴/🟡**
  - Cron Triggers, Queues, Workflows escalation, Hyperdrive vs external Postgres (`status.alisanan.site`).
- [ ] **Week 10 — AI Accessibility Tool 🔴/🟡**
  - Workers AI vision model for alt-text & caption generation (`alt.alisanan.site`).
- [ ] **Weeks 11–12 — Edge Feature-Flag / A-B Testing Platform 🔴/🟡**
  - Dynamic KV flags, real-time DO updates, D1 analytics (`flags.alisanan.site`).

### Phase 3 — Advanced Workloads, Containers & Media (Weeks 13–19)
- [ ] **Weeks 13–14 — AI Agent Sandbox 🔴**
  - Full Linux container workloads behind Workers, isolated code execution (`sandbox.alisanan.site`).
- [ ] **Week 15 — Screenshot & PDF Generation API 🟡**
  - Cloudflare Browser Rendering / Quick Actions (`render.alisanan.site`).
- [ ] **Weeks 15–16 — Custom Image Transformation Server 🔴/🟡**
  - Bun + Hono on Oracle VPS with Sharp, Docker containerization, Cloudflare VPC (`img.alisanan.site`).
- [ ] **Weeks 17–18 — Media CMS Lite 🟡**
  - Dynamic image processing + Cloudflare Stream integration (`media.alisanan.site`).
- [ ] **Week 19 — Internet Trends Dashboard 🟡**
  - Cloudflare Radar API + Workers Cache / Cache Reserve (`radar.alisanan.site`).

### Phase 4 — Security & Case Studies (Weeks 20–21)
- [ ] **Week 20 — Security Pass 🔴**
  - Cloudflare Access, custom WAF rules, rate limiting, Tunnels across all deployed services.
- [ ] **Week 21 — Portfolio & Positioning Push**
  - Comprehensive case studies writeups, updated resume/LinkedIn, job/client push.

---

## 📂 Repository Layout

```text
cf-mastery/
├── ROADMAP.md                  # Detailed task tracking breakdown
├── README.md                   # High-level overview & status dashboard
├── AGENTS.md                   # AI pairing instructions & guidelines
├── .obsidian/                  # Vault configuration & settings
│
├── notes/                      # Obsidian Knowledge Base & Content Hub
│   ├── templates/              # Obsidian note templates
│   ├── weekly-logs/            # Per-week topic notes (e.g. week-01/cpu-vs-wall-time.md)
│   ├── case-studies/           # Architectural writeups & benchmarks
│   ├── articles/               # Draft tech blog posts
│   └── posts/                  # Draft X threads & LinkedIn posts
│
├── apps/                       # (Future) Turborepo application packages
└── packages/                   # (Future) Shared monorepo packages
```

---

## ✍️ Content & Vault Setup

Obsidian vault is pre-configured with templates under `notes/templates/`:
- **Weekly Logs:** `notes/templates/weekly-log.md`
- **Case Studies:** `notes/templates/case-study.md`
- **Articles:** `notes/templates/article.md`
- **Social Posts:** `notes/templates/social-post.md`
