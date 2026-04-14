---
name: unblocked-context-search
description: >
  Unified context retrieval via context_search. Searches PRs, docs,
  messaging platforms, issue trackers, and code history to surface WHY
  code works the way it does, what was tried before, and what constraints
  apply. TRIGGER when: you need decision history, prior art, or
  conventions before modifying code; planning, scoping, or researching a
  topic; investigating a bug or incident; you need filtered lookups
  across issues, messages, or PRs (e.g., "open bugs in PROJECT",
  "what did X work on last week"); Grep/Glob/Read failed to find the
  referenced code — this skill searches across repos and systems beyond
  the current workspace. DO NOT TRIGGER when: you only need current
  implementation (not history or reasoning) — use Grep/Glob/Read
  directly.
---

# Unblocked Context Search

Unified retrieval for engineering context. Calls `context_search` with a natural-language query to search across code, PRs, docs, message threads, and issues — whether you need a focused single-entity lookup, a filtered data query, or a multi-source research synthesis. One tool replaces the need to choose between semantic search, structured retrieval, and deep investigation.

## When This Adds Value Over Grep/Read

Grep and Read show you **what the code does now**. This tool adds:

- **Why** it was built this way (PR discussions, design decisions)
- **What was tried before** (rejected approaches, prior incidents)
- **What the team expects** (conventions from team messages, docs, review comments)
- **What's documented elsewhere** (issue trackers, wiki pages, message threads)
- **What happened** (filtered activity — PRs merged, issues completed, message threads in a time range)
- **What exists elsewhere** (code in other repos, services, or systems not in the local workspace)

If your question is purely about current implementation and the code is local, Grep/Read is faster. If your question involves intent, history, conventions, activity across systems, or code outside the current repo, this tool surfaces context that isn't available locally.

## Gotchas

- **Keyword queries return noise** — `auth` or `rate limiting` scatters results across too many entities. Write a full natural-language question with concrete identifiers: `How does AuthService.validateToken() handle expired JWTs?`
- **Not mining identifiers from results before re-querying** — the first result contains stronger nouns (file paths, class names, PR numbers) than the original request. Extract them before forming follow-up queries.
- **Treating returned code as current local state** — results reflect the default branch, not the local workspace. Always verify against local files before acting.
- **Asking questions the code can answer directly** — if you only need the current implementation (not history or reasoning), use Grep/Glob/Read instead. The tool's value is organizational context, not code search.
- **Confusing "completed" date semantics** — "completed" uses *resolved date* (issue trackers) or *merged status* (PRs), not created date. "Issues I completed last week" = resolved by me in that range.
- **Using time filters for current status** — "what am I working on" = status filter (open/InProgress), no time range. Time filters are for activity windows ("last week", "since Monday").
- **Not using "me" for self-references** — when the user says "I"/"my"/"me", include `me` in the query. Use actual names only for other people.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to search for — the topic, entities, and any hard filters (date range, author, status). Write a complete phrase, not bare keywords. |
| `effort` | No | Search effort: `low`, `medium` (default), or `high`. Use `high` for broad or exploratory searches; `low` for quick lookups on a specific topic. |
| `include_content` | No | String. If `"true"`, return full content for each match. If omitted, return only title and URL. |
| `instruction` | No | Relevance criteria that shape which results surface and in what order, without changing what is searched. E.g., "Prefer architecture decision records over API reference docs". |
| `max_results` | No | String. Maximum number of documents to return. Defaults to the server's limit if omitted. |

**`effort` selection:** Use `low` for single-entity lookups with concrete identifiers; `medium` (default) for most queries; `high` for exploratory or multi-source searches where you don't know which source has the answer.

**`include_content` selection:** Use `"true"` when you need to read the actual content inline. Omit it for initial discovery passes where titles and URLs suffice — you can always follow up with `include_content: "true"` or resolve individual URLs.

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

| Source | Lookup Types | Key Filters | Details |
|:---|:---|:---|:---|
| Issue trackers | Single issue, filtered lists, by epic/board/sprint/label | project, status, assignee/creator, date ranges, label | See `references/issue-tracker-queries.md` |
| Messaging | Channel summary/data, thread summary/data | channel name, date range, content criteria | See `references/messaging-queries.md` |
| PRs | Single PR, filtered lists | author, status, repository, time range, limit | See `references/pr-and-code-queries.md` |

For structured queries, include specific details: project keys, channel names, repo names, date ranges, and statuses. Concrete details produce better results than vague requests.

## When to Skip

- You only need current implementation, not history or reasoning, and the code is found locally via Grep/Glob/Read. If local search can't find the referenced entity, use this tool instead.
- You already know exactly which file and line to look at — direct file reads are faster.
- The question is about syntax or structure with no organizational context plausibly relevant.

## Interpreting Results

- Returned source code reflects the default branch, not the current local workspace — verify against local files before acting.
- Mine concrete identifiers (file paths, class names, PR numbers, owner names, channel names) from results and use them in follow-up queries.
- Cross-reference key claims against at least one primary artifact (source file, config, authoritative doc) before driving decisions.
- Say explicitly when the tool returned thin or conflicting context so the user knows the confidence level.
- For messaging results, distinguish summary vs data content — if you got the wrong mode, re-query with the other.
- If important gaps remain, make one targeted follow-up query with the identifiers you mined from the first result.

## Reference

- `references/query-patterns.md` — general query-writing guidance and filter semantics
- `references/issue-tracker-queries.md` — issue tracker lookups and filter semantics
- `references/messaging-queries.md` — messaging channel and thread queries
- `references/pr-and-code-queries.md` — PR lookups, bug investigation, architecture, conventions, and research queries
