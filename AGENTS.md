# cf-mastery

21-week Cloudflare/Edge Computing mastery roadmap. This repo is primarily a learning plan (`ROADMAP.md`) with projects built as chapters are completed.

## Project conventions

- **All projects deploy** to a real subdomain on `alisanan.site`
- **Weekly accountability:** check-in with Sohaib + public build post on X/LinkedIn
- **AI modes:**
  - 🔴 **UNASSISTED** — no codegen, AI only for conceptual Q&A
  - 🟡 **AI-PAIRED** — AI can generate, but you must explain every line
  - Frontend/UI is always 🟡 (Kumo, Fluent, or HeroUI + AI-scaffolded layouts)

## Repo state

- No commits yet — this is a fresh roadmap scaffold
- No packages, tests, or CI defined; each chapter introduces its own toolchain
- `.obsidian/` — Obsidian vault config for personal notes
- `ROADMAP.md` is gitignored (personal tracking, not committed)

## Commands (as chapters add them)

Will include Wrangler (`npx wrangler`), Drizzle, and Docker per-week. Run from the chapter's project directory.

## Toolchain

- **Runtime:** Cloudflare Workers (wrangler.toml per project)
- **Database:** D1 + Drizzle ORM (weeks 4+)
- **Storage:** KV, R2, Durable Objects
- **Queues/Workflows:** weeks 8–9
- **Containers:** weeks 13–15 (Docker + Oracle VPS)
