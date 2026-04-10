---
name: unblocked-context-search
description: >
  Invoke proactively before modifying unfamiliar code and at the start of
  any planning task. Searches PRs, Slack, Jira, docs, and code history via
  context_search to surface WHY code works the way it does, whether a
  change was already attempted, and what constraints or in-flight work
  could affect your approach. TRIGGER when: you encounter an unknown about a
  class, service, or module; you need decision history, prior art, or
  conventions before modifying code; you need to check if a bug or pattern
  is already documented; question spans multiple entities, systems, or
  APIs; planning integration, migration, upgrade, or refactor;
  investigating an incident; assessing risk before a significant change;
  user asks to "research", "investigate", or "deep dive" a topic; you need
  Jira issues, Slack messages, or PRs by filter (PROJ-123, #channel-name,
  PR #42, "what did X work on last week", "open bugs in PROJECT"); user
  asks "what's in the current sprint" or "what did X work on";
  Grep/Glob/Read failed to find the referenced code, service, or module,
  as this skill can search across repos and systems beyond the current
  workspace. DO NOT TRIGGER when: you have the exact URL — use
  link_resolver; you only need current implementation (not history or
  reasoning) — use Grep/Glob/Read directly.
---

# Unblocked Context Search

Unified retrieval for engineering context. Calls `context_search` with a natural-language query to search across code, PRs, docs, Slack threads, and Jira issues — whether you need a focused single-entity lookup, a filtered data query, or a multi-source research synthesis. One tool replaces the need to choose between semantic search, structured retrieval, and deep investigation.

## When This Adds Value Over Grep/Read

Grep and Read show you **what the code does now**. This tool adds:

- **Why** it was built this way (PR discussions, design decisions)
- **What was tried before** (rejected approaches, prior incidents)
- **What the team expects** (conventions from Slack, docs, review comments)
- **What's documented elsewhere** (Jira tickets, Confluence pages, Slack threads)
- **What happened** (filtered activity — PRs merged, issues completed, Slack discussions in a time range)

If your question is purely about current implementation, Grep/Read is faster. If your question involves intent, history, conventions, or activity across systems, this tool surfaces context that isn't in the code.

## Gotchas

- **Keyword queries return noise** — `auth` or `rate limiting` scatters results across too many entities. Write a full natural-language question with concrete identifiers: `How does AuthService.validateToken() handle expired JWTs?`
- **One broad query instead of parallel focused ones** — two distinct unknowns need two queries run in parallel, not one umbrella question. Broad queries dilute ranking and bury the best results.
- **Not mining identifiers from results before re-querying** — the first result contains stronger nouns (file paths, class names, PR numbers) than the original request. Extract them before forming follow-up queries.
- **Treating returned code as current local state** — results reflect the default branch, not the local workspace. Always verify against local files before acting.
- **Asking questions the code can answer directly** — if you only need the current implementation (not history or reasoning), use Grep/Glob/Read instead. The tool's value is organizational context, not code search.
- **Confusing "completed" date semantics** — "completed" uses *resolved date* (Jira) or *merged status* (PRs), not created date. "Issues I completed last week" = resolved by me in that range.
- **Using time filters for current status** — "what am I working on" = status filter (open/InProgress), no time range. Time filters are for activity windows ("last week", "since Monday").
- **Not using "me" for self-references** — when the user says "I"/"my"/"me", include `me` in the query. Use actual names only for other people.

## Input

```text
query: A natural-language question describing what you need.
```

Write each query as a complete question or directive. Include the most concrete details you have:

- Service, module, class, or method names
- File paths or endpoints
- Project keys, channel names, repo names
- Date ranges, statuses, assignees
- Decision topics or feature names

The tool routes your query to the right retrieval strategy internally — you don't need to specify whether you want semantic search, a filtered lookup, or a research synthesis.

## Splitting Queries

Split distinct unknowns into separate `context_search` calls rather than cramming everything into one query. Each call should have one objective. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Investigate the authentication flow and the rate limiting conventions in the API gateway.

**Two parallel queries (focused results):**
> Query 1: How does AuthService.validateToken() verify JWTs and handle expiration?
>
> Query 2: What conventions does the team follow for rate limiting middleware in the API gateway?

For complex investigations that span many entities, write a detailed 2-5 sentence directive rather than a short keyword fragment. Include the specific entities, systems, and questions you want answered.

## Data Sources

The tool can retrieve structured records in addition to semantic search results.

| Source | Lookup Types | Key Filters |
|:---|:---|:---|
| Jira | Single issue, filtered lists, by epic/board/sprint/label | project, status, assignee/creator, date ranges, label |
| Slack | Channel summary/data, thread summary/data | channel name, date range, content criteria |
| PRs | Single PR, filtered lists | author, status, repository, time range, limit |

For structured queries, include specific details: project keys, channel names, repo names, date ranges, and statuses. Concrete details produce better results than vague requests.

## When to Skip

- You already have the exact URL — use `link_resolver` to fetch its content.
- You only need current implementation, not history or reasoning, and the code is found locally via Grep/Glob/Read. If local search can't find the referenced entity, use this tool instead.
- You already know exactly which file and line to look at — direct file reads are faster.
- The question is about syntax or structure with no organizational context plausibly relevant.

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names, channel names) from results and use them in follow-up queries.
- Cross-reference key claims against at least one primary artifact (source file, config, authoritative doc) before driving decisions.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.
- For Slack results, distinguish summary vs data content — if you got the wrong mode, re-query with the other.
- If important gaps remain, make one targeted follow-up query with the identifiers you mined from the first result.

## Reference

See `references/query-cookbook.md` for example queries organized by scenario.
