# Codebase Orientation Document Template

Use this template to structure the orientation document produced by the onboard-codebase
skill. Adapt sections as needed for the specific system.

---

## Template

```markdown
# [System/Repo Name] — Orientation

> Generated on [date] by onboard-codebase skill with Unblocked context.
> This document is a snapshot. Re-run the skill periodically to refresh.

## What This System Does

[2-3 sentences: the system's purpose, who uses it, what problem it solves.]

## Architecture Overview

[High-level description of the system's architecture. Include a simple diagram
if the structure warrants it.]

### Components

| Component | Responsibility | Key Files |
|-----------|---------------|-----------|
| [name] | [what it does] | [key file paths] |

### Dependencies

- **Depends on:** [upstream services, databases, external APIs]
- **Depended on by:** [downstream consumers, other services, UIs]

## Key File Guide

[The files a developer touches most often, grouped by function.]

### Entry Points
- `[path]` — [what it handles]

### Core Logic
- `[path]` — [what business rules live here]

### Data Layer
- `[path]` — [models, schemas, database access]

### Config
- `[path]` — [what's configurable, key env vars]

### Tests
- `[path]` — [testing approach, where to add tests]

## Conventions

[How the team writes code in this repo.]

- **Naming:** [conventions for files, functions, variables]
- **Error handling:** [pattern used]
- **Testing:** [unit/integration split, mocking approach, test organization]
- **File organization:** [how new code should be organized]
- **PR process:** [team conventions for PRs and reviews]

## Key Decisions

[Architectural decisions that shape the system. Include rationale.]

| Decision | Rationale | Source |
|----------|-----------|--------|
| [what was decided] | [why] | [PR, ADR, or discussion reference] |

### Rejected Alternatives

[Approaches that were considered and rejected — so you don't re-propose them.]

- **[Alternative]:** Rejected because [reason]. Source: [reference]

## Tech Debt and Gotchas

[Known issues, areas flagged for improvement, and things that might surprise you.]

- **[Area]:** [what's problematic and why]. Status: [being addressed / known / deferred]

## Current Direction

[What's actively changing. Systems mid-migration are different from stable systems.]

- **[Migration/initiative]:** [what's happening, current status, what it affects]

## Domain Experts

[Who to ask when questions arise.]

| Area | Expert(s) | Notes |
|------|-----------|-------|
| [system area] | [names/handles] | [what they know best] |

## Getting Started

[Practical steps for a new developer.]

1. [Setup step — environment, dependencies, etc.]
2. [How to run the system locally]
3. [How to run tests]
4. [First good task to try]

## Quick Reference

- **Language/Framework:** [e.g., TypeScript / Express]
- **Build:** [how to build]
- **Test:** [how to test]
- **Deploy:** [how deployment works]
- **Monitoring:** [where to check if something's wrong]
```

---

## Tips for Good Orientation Documents

1. **Be specific.** "The API is in `src/api/`" is better than "there's an API layer."

2. **Name files.** Give exact paths. The reader will navigate to them.

3. **Explain the why.** "We use Redis for session storage because the team evaluated Memcached and Redis in Q3 2024 and chose Redis for its persistence" is better than "sessions are in Redis."

4. **Flag what's changing.** If the team is migrating from Express to Fastify, say so — otherwise the new developer will build on the wrong foundation.

5. **Include gotchas.** "The `users` table has a column called `name` that actually stores email addresses (legacy naming, ticket TECH-456 to fix)" saves hours of confusion.

6. **Keep it honest.** If an area is messy, say so. The document should reflect reality, not aspirations.
