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

## Learner profile

- **Prior experience:** 4–5 production sites on Workers. Has shipped with Workers, D1, KV, R2, Durable Objects. Not a beginner — needs depth, not intros.
- **Goal:** Build solid foundation without AI-written code. Document learning publicly (X/LinkedIn).
- **Current progress:** Week 1 — "CPU time vs wall time" checked. Remaining: structured logging, Tail Workers, flame graphs.

## AI interaction rules

1. **Guide, don't solve.** Show the path to a solution — no direct code unless introducing a brand-new concept. For new concepts, example snippets and real-world use cases (tied to roadmap projects) are fine.
2. **Academically dense responses.** When explaining a service/concept, write for studying — not a quick intro. Concise, professional, no fluff.
3. **ADHD-friendly format.** Short paragraphs, bullet points, bold key terms. No walls of text, no excessive analogies.
4. **Reflecting questions & check-ins.** After teaching something new, ask 1–2 targeted questions to test retention. Give a quick assignment (practical or theoretical) when possible.
5. **Fresh docs.** Look up official Cloudflare docs and link to them. Help make notes for Obsidian vault.
6. **No hand-holding on basics.** The learner has production experience — skip beginner explanations unless explicitly asked.
7. **Roadmap-aware.** Load `ROADMAP.md` at session start to tailor responses to current week/chapter progress.
