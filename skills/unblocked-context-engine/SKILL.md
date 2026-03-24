---
name: unblocked-context-engine
description: >
  Surgical single-entity lookup via unblocked_context_engine. Returns code,
  PRs, docs, Slack threads, and Jira issues for ONE focused question about
  ONE specific class, module, endpoint, or service. Invoke proactively
  whenever you encounter an unknown about a specific entity — whether
  reading, writing, or reviewing code.
  TRIGGER when: you hit a specific unknown about one entity at any phase
  of work; you just read code and need to understand WHY it works a
  certain way — not just WHAT it does; you are about to modify code and
  need the reasoning or decision history behind it; you need to check if
  a bug, error pattern, or edge case is already documented; you need to
  verify whether generated or planned code matches team conventions for
  a specific pattern; you need to validate one specific assumption about
  how something works; the question is "why does this exist?" or "why is
  this done this way?" for a single entity.
  DO NOT TRIGGER when: the question spans multiple systems or entities
  and you need to build a broad picture — use unblocked-research for
  comprehensive investigation; you would need 3+ context-engine calls to
  answer the question — use unblocked-research instead; you only need
  the current implementation (not history or reasoning) — use
  Grep/Glob/Read directly.
---

# Unblocked Context Engine

Surgical single-entity retrieval at any phase of work. Returns code, PRs, docs, Slack threads, and Jira issues for one focused question. Use it whenever the answer to "why does this exist?" or "why does it work this way?" is not visible in the code itself. If the question spans multiple systems or you would need 3+ calls to build the picture, use `research_task` instead.

## When This Adds Value Over Grep/Read

Grep and Read show you **what the code does now**. This tool adds:

- **Why** it was built this way (PR discussions, design decisions)
- **What was tried before** (rejected approaches, prior incidents)
- **What the team expects** (conventions from Slack, docs, review comments)
- **What's documented elsewhere** (Jira tickets, Confluence pages, Slack threads)

If your question is purely about current implementation, Grep/Read is faster. If your question involves intent, history, or conventions, this tool surfaces context that isn't in the code.

## Common Pattern: Read → Query → Act

The most natural flow when modifying unfamiliar code:

1. **Read** the file with Read/Grep to see the current implementation
2. **Query** the context engine to understand *why* it works that way — the history, decisions, and constraints not visible in the code
3. **Act** on the combined understanding of what the code does and why

Skip step 2 when the code is self-explanatory or you only need the current implementation. Use step 2 when the code has surprising behavior, non-obvious patterns, or you need to know whether changing it will violate a team convention.

## Gotchas

- **Keyword queries return noise** — `auth` or `rate limiting` scatters results across too many entities. Write a full natural-language question with a concrete identifier: `How does AuthService.validateToken() handle expired JWTs?`
- **One broad query instead of parallel focused ones** — two unknowns need two queries run in parallel, not one umbrella question. Broad queries dilute ranking and bury the best results.
- **Not mining identifiers from results before re-querying** — the first result contains stronger nouns (file paths, class names, PR numbers) than the original request. Extract them before forming follow-up queries.
- **Treating returned code as current local state** — results reflect the default branch, not the local workspace. Always verify against local files before acting.
- **Asking questions the code can answer directly** — if you only need the current implementation (not the history or reasoning behind it), use Grep/Glob/Read instead. The tool's value is organizational context, not code search.

## Input

```text
query: One focused natural-language question about one entity.
```

Write each query as a complete question. Include the most concrete identifier you have — even an imperfect one beats a vague noun:

- Service or module names
- Class or method names
- File paths or endpoints
- Decision topics or feature names

## When to Skip

Direct retrieval (Grep, Glob, Read) is faster when:
- You already know exactly which file and line to look at
- The question is about syntax or structure, not history or intent
- No organizational context (team decisions, prior incidents, rejected alternatives) is plausibly relevant
- You only need the current implementation, not the reasoning behind it

Use `unblocked-research` instead when:
- The question spans multiple entities, systems, or APIs
- The user is planning integration, migration, or upgrade work
- You are onboarding to a new area and need to understand how multiple things fit together — a single `research_task` call can replace 3+ individual context-engine calls and produce a synthesized narrative
- You would need 3+ separate context-engine calls to build the picture

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names) from results and use them in follow-up queries.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.

## Reference

See `references/query-cookbook.md` for example queries organized by scenario.
