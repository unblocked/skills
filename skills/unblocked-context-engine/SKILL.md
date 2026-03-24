---
name: unblocked-context-engine
description: >
  Surgical single-entity lookup via unblocked_context_engine. Returns code,
  PRs, docs, Slack threads, and Jira issues for ONE focused question about
  ONE specific class, module, endpoint, or service. Invoke proactively
  mid-implementation whenever you encounter an unknown about a specific
  entity.
  TRIGGER when: you are mid-implementation and hit a specific unknown about
  one entity; you need to know why a method behaves a certain way; you need
  to check if a bug or pattern is already documented; you need the decision
  history behind one specific piece of code — without breaking your coding
  flow.
  DO NOT TRIGGER when: you are planning, scoping, or investigating before
  writing code; the question spans multiple systems or entities; you need to
  build a broad picture — use unblocked-research for comprehensive
  investigation during planning phases.
---

# Unblocked Context Engine

Surgical single-entity retrieval during active coding. Returns code, PRs, docs, Slack threads, and Jira issues for one focused question. Use it mid-implementation when the answer to "why does this exist?" or "why does it work this way?" is not visible in the code itself. If you are still in a planning or investigation phase, use `research_task` instead for a comprehensive picture.

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
- You are in a planning, scoping, or investigation phase and need to understand how multiple things fit together — use `research_task` instead.
- You already know exactly which file and line to look at
- The question is about syntax or structure, not history or intent
- No organizational context (team decisions, prior incidents, rejected alternatives) is plausibly relevant
- You only need the current implementation, not the reasoning behind it

Use `unblocked-research` instead when:
- The question spans multiple entities, systems, or APIs
- The user is planning integration, migration, or upgrade work
- You would need 3+ separate context-engine calls to build the picture

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names) from results and use them in follow-up queries.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.

## Reference

See `references/query-cookbook.md` for example queries organized by scenario.
