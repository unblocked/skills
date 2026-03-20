---
name: unblocked-context-engine
description: >
  Use unblocked_context_engine for a focused question about a specific entity
  (class, service, method, API, or module) — returns code, PRs, docs, Slack
  threads, and Jira issues in one shot. Use when the user asks "what is X",
  "how does X work", "why does X do Y", or "tell me about X". Also use
  proactively before touching unfamiliar code, when behavior doesn't match
  expectations, or to check if a bug or pattern is already documented. For
  broad investigation spanning multiple entities or systems, use
  unblocked-research instead.
---

# Unblocked Context Engine

Returns code, PRs, docs, Slack threads, and Jira issues for a single focused question. Use it when the answer to "why does this exist?" or "why does it work this way?" is not visible in the code itself.

## Gotchas

- **Keyword queries return noise** — `auth` or `rate limiting` scatters results across too many entities. Write a full natural-language question with a concrete identifier: `How does AuthService.validateToken() handle expired JWTs?`
- **One broad query instead of parallel focused ones** — two unknowns need two queries run in parallel, not one umbrella question. Broad queries dilute ranking and bury the best results.
- **Not mining identifiers from results before re-querying** — the first result contains stronger nouns (file paths, class names, PR numbers) than the original request. Extract them before forming follow-up queries.
- **Treating returned code as current local state** — results reflect the default branch, not the local workspace. Always verify against local files before acting.
- **Skipping the tool for "obvious" subsystems** — well-known services often have decisions baked into Slack threads or closed PRs that aren't visible in the code. When in doubt, query.
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
- You would need 3+ separate context-engine calls to build the picture

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names) from results and use them in follow-up queries.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.

## Reference

See `references/query-cookbook.md` for example queries organized by scenario.
