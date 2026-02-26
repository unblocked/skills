# Codebase Orientation Document Template

Adapt sections as needed for the specific system.

---

## Template

```markdown
# [System/Repo Name] — Orientation

> Generated on [date] using Unblocked context. Re-run periodically to refresh.

## What This System Does

[2-3 sentences: purpose, users, problem it solves.]

## Architecture Overview

[High-level description. Simple diagram if warranted.]

### Components

| Component | Responsibility | Key Files |
|-----------|---------------|-----------|
| [name] | [what it does] | [paths] |

### Dependencies

- **Depends on:** [upstream services, databases, external APIs]
- **Depended on by:** [downstream consumers, other services]

## Key File Guide

### Entry Points
- `[path]` — [what it handles]

### Core Logic
- `[path]` — [business rules]

### Data Layer
- `[path]` — [models, schemas, DB access]

### Config
- `[path]` — [what's configurable, key env vars]

### Tests
- `[path]` — [testing approach, where to add tests]

## Conventions

- **Naming:** [files, functions, variables]
- **Error handling:** [pattern used]
- **Testing:** [unit/integration split, mocking, organization]
- **File organization:** [how new code should be organized]
- **PR process:** [team conventions]

## Key Decisions

| Decision | Rationale | Source |
|----------|-----------|--------|
| [what] | [why] | [reference] |

### Rejected Alternatives

- **[Alternative]:** Rejected because [reason]. Source: [reference]

## Tech Debt and Gotchas

- **[Area]:** [what's problematic]. Status: [being addressed / known / deferred]

## Current Direction

- **[Migration/initiative]:** [what's happening, status, what it affects]

## Domain Experts

| Area | Expert(s) | Notes |
|------|-----------|-------|
| [area] | [names] | [what they know best] |

## Getting Started

1. [Setup — environment, dependencies]
2. [How to run locally]
3. [How to run tests]
4. [First good task to try]

## Quick Reference

- **Language/Framework:** [e.g., TypeScript / Express]
- **Build:** [how]
- **Test:** [how]
- **Deploy:** [how]
- **Monitoring:** [where to check]
```

---

## Tips

1. **Be specific.** Give exact paths, not vague references.
2. **Explain the why.** "We use Redis because the team evaluated Memcached and Redis in Q3 and chose Redis for persistence" beats "sessions are in Redis."
3. **Flag what's changing.** If migrating frameworks, say so.
4. **Include gotchas.** Save hours of confusion.
5. **Keep it honest.** Reflect reality, not aspirations.
