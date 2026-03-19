---
name: unblocked-context-engine
description: >
  Use unblocked_context_engine to answer ONE specific question about ONE
  specific entity — getting back code, PRs, docs, Slack threads, and Jira
  issues in one shot. Invoke this skill: at the very start of any task before
  touching unfamiliar code; before entering a class, module, or service you
  haven't read yet; when you see behavior that doesn't match the code and need
  to check history; when you want to know if a bug or pattern is already
  documented. Also use it proactively when touching any subsystem where team
  decisions, rejected approaches, or prior incidents might be relevant — even
  if the code looks obvious.
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

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names) from results and use them in follow-up queries.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.

## Reference

See `references/query-cookbook.md` for example queries organized by scenario.
