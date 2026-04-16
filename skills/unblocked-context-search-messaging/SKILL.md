---
name: unblocked-context-search-messaging
description: >
  Messaging-only search via context_search_messaging. Use this instead of
  context_search when you want team conversation results — Slack threads,
  channel discussions, and chat history — without PR, issue, or doc noise
  mixed in. TRIGGER when: finding what the team discussed or decided in
  chat; surfacing informal context around a feature, incident, or decision;
  the user asks "did anyone discuss X", "was there a conversation about Y",
  "what did the team say about Z", or "who has been talking about this".
  DO NOT TRIGGER when: you need the current code state — use Grep/Glob/Read;
  you need PRs, issues, or docs alongside messages — use context_search
  instead.
---

# Unblocked Context Search — Messaging

Messaging-only retrieval. Calls `context_search_messaging` with a natural-language query to semantically search team conversations — surfacing informal context, decisions, and discussions that don't make it into code or docs.

**Sources:** Slack, Microsoft Teams.

## When This Adds Value Over Grep/Read

Grep and Read search local files. Use this tool when:

- **Decisions happen in chat** — architectural choices, convention agreements, and scope changes are often discussed informally before (or instead of) being written down
- **You need incident context** — outage war-rooms, incident threads, and post-mortems often live in Slack
- **You want messaging-only results** — `context_search` returns everything (PRs, issues, docs, code); this returns only messages, so results stay focused when that's all you need
- **You want to know who knows what** — conversations surface who has context on a topic, not just what was said

## When to Use `context_search` Instead

Use `context_search` when you need the full picture alongside messages — PR discussions, issue tracker context, docs, or code history. This tool returns messaging only; broader context requires `context_search`.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to find — write a complete question with concrete identifiers, not bare keywords. |
| `instructions` | No | Fine-grained control over which results surface: preferred channels, date ranges, or topics to prioritize or deprioritize. |

**Writing effective queries** — include the most concrete identifiers you have:

- Service, feature, or component names (`billing-service`, `checkout flow`, `rate limiting`)
- Channel names when you know them (`#incidents`, `#payments-team`, `#backend-review`)
- People's names when relevant (`what did Alice say about the gRPC migration`)
- Time context when relevant (`discussions last week`, `around the March outage`)

Write a complete question or directive, not a keyword fragment:

| Instead of | Write |
|:---|:---|
| `rate limiting` | `Did the team discuss the rate limiting approach for the API gateway in Slack?` |
| `gRPC migration` | `Was there a conversation about switching from REST to gRPC for inter-service calls?` |
| `auth refactor` | `What did the team discuss when planning the JWT token refresh refactor?` |
| `outage` | `Were there Slack discussions about the checkout-service outage in March?` |

**`instructions` examples:**
- `"Focus results on the #payments-team and #backend-review channels"`
- `"Focus on discussions from the last 3 months"`
- `"Prefer threads with multiple participants over one-off messages"`

## Splitting Queries

Split distinct unknowns into separate `context_search_messaging` calls rather than cramming everything into one query. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Find discussions about the rate limiting approach and also the gRPC migration decision.

**Two parallel queries (focused results):**
> Query 1: Did the team discuss the rate limiting approach for the API gateway?
>
> Query 2: Was there a conversation about switching from REST to gRPC for inter-service calls?

## When to Skip

- You need the current code state — use Grep/Glob/Read
- You also need PRs, issues, or docs — use `context_search` instead

## Interpreting Results

- Conversations reflect what was said at a point in time — decisions may have changed since; verify against current code or docs before acting
- Mine concrete identifiers (channel names, people's names, thread dates) from results for follow-up queries
- Informal discussions may contradict formal docs — flag the conflict rather than assuming one is authoritative
- If results are thin, re-query with a channel name, person's name, or time range extracted from the first pass

## Reference

- `references/query-patterns.md` — query examples organized by use case, with good/bad comparisons and `instructions` patterns
