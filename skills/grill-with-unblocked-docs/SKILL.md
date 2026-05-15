---
name: grill-with-unblocked-docs
description: >
  Grilling session that challenges a plan against the existing domain model,
  local code, and organizational context retrieved with `context_research`,
  focused `context_search_*` tools, `context_query_*`, and `context_get_urls`.
  Use when the user wants to stress-test a plan, sharpen terminology, resolve
  design decisions, capture resolved decisions, or get recommendations with
  explicit confidence based on code plus PR history, messages, issues, docs,
  URLs, and cross-repo code.
---

# Grill With Unblocked Docs

Interview the user relentlessly about every aspect of the plan until you reach
a shared understanding. Walk the design tree branch by branch, resolving
dependencies between decisions one at a time.

For each decision point, provide your recommended answer and a confidence
level. Ask exactly one question at a time and wait for the user's feedback
before continuing.

If a question can be answered by exploring the local codebase, explore the
codebase instead of asking. If a question depends on organizational context
that code alone cannot reveal, choose the exact Unblocked tool from the routing
table below.

## Initial Orientation

At the start of the session:

1. Skim the local code paths that are obviously related to the user's plan.
2. Check and cache CLI availability once with `command -v unblocked`. If the
   CLI is available, run `unblocked context-research --query "<query>"
   --instruction "<instruction>" --effort high` for a broad first pass over the
   relevant domain language, product context, design docs, issue history, PR
   history, team discussions, incidents, and cross-repo conventions before
   challenging terminology.
3. If the CLI is unavailable or the CLI call fails, fall back to MCP
   `context_research` with equivalent `query`, `instruction`, and `effort`
   arguments. If neither CLI nor MCP is available, stop and say the question
   requires Unblocked organizational context.
4. Mine results for stronger identifiers, then use a focused tool from the table
   when a term, decision, repo, issue, PR, doc title, URL, channel, or person
   becomes important.
5. Treat local documentation as an optional persistence target, not as the source
   of truth for the grilling session.

## Evidence Routing

Use the cheapest reliable source that can answer the question. For detailed
tool behavior, consult the sibling skills in this repo: `unblocked-tools-guide`,
`unblocked-context-research`, `unblocked-context-get-urls`,
`unblocked-context-search-code`, `unblocked-context-search-documentation`,
`unblocked-context-search-prs`, `unblocked-context-search-issues`,
`unblocked-context-search-messages`, `unblocked-context-query-issues`, and
`unblocked-context-query-prs`.

| Question type | Exact source/tool |
|:---|:---|
| Current local behavior, APIs, types, tests, config | Local `rg`, file reads, and tests |
| Full domain/product picture across docs, PRs, issues, messages, incidents, and code history | `context_research` / `unblocked context-research` |
| Domain language, glossary, product context, design docs, runbooks | `context_search_documentation` / `unblocked context-search-documentation`; MCP fallback is `context_research` with documentation steering |
| Why something was built this way, what changed, rejected approaches | `context_search_prs` / `unblocked context-search-prs`; MCP fallback is `context_research` with PR steering |
| What the team discussed or decided informally | `context_search_messages` / `unblocked context-search-messages`; MCP fallback is `context_research` with message steering |
| Whether work is planned, blocked, duplicated, or bug-reported | `context_search_issues` / `unblocked context-search-issues`; MCP fallback is `context_research` with issue steering |
| Definitive filtered issue list by project/person/status | `context_query_issues` / `unblocked context-query-issues`; CLI-only, no complete MCP equivalent |
| Definitive filtered PR list by repo/person/status/date | `context_query_prs` / `unblocked context-query-prs`; CLI-only, no complete MCP equivalent |
| Code outside the local workspace or semantic cross-repo code search | `context_search_code` / `unblocked context-search-code`; MCP fallback is `context_research` with code steering |
| Concrete URL provided by the user or returned by research | `context_get_urls` / `unblocked context-get-urls` |

Do not ask the user to answer something that local code, `context_research`,
`context_search_*`, `context_query_*`, or `context_get_urls` can answer with
reasonable effort. Ask the user when the remaining uncertainty is a product,
domain, or preference decision rather than a discoverable fact.

## Exact Unblocked Tool Routing

For organizational context that code alone cannot reveal, choose one of these
tools explicitly. Follow `unblocked-tools-guide` for the same access policy:
check `command -v unblocked` once per session, prefer the CLI, fall back to MCP
only when the CLI is unavailable or fails, and stop if neither is available.

Do not infer CLI availability from the MCP tool list. Fine-grained tools such as
`context_search_prs`, `context_search_issues`, `context_search_documentation`,
`context_search_messages`, `context_search_code`, `context_query_issues`, and
`context_query_prs` are CLI-first and may not be exposed through MCP.

| Need | CLI command | MCP fallback |
|:---|:---|:---|
| Broad research across docs, PRs, issues, messages, incidents, and code history | `unblocked context-research --query "<query>" --instruction "<instruction>" --effort high` | `context_research` with `query`, `instruction`, `effort` |
| Documentation-only search | `unblocked context-search-documentation --query "<query>" --instruction "<instruction>"` | `context_research` with `instruction: "Prefer documentation, wikis, and runbooks; deprioritize code and messages"` |
| PR-only history and reasoning | `unblocked context-search-prs --query "<query>" --instruction "<instruction>"` | `context_research` with `instruction: "Prefer PR descriptions and review discussions; deprioritize other sources"` |
| Issue-only semantic search | `unblocked context-search-issues --query "<query>" --instruction "<instruction>"` | `context_research` with `instruction: "Prefer issue tracker results; deprioritize code and messages"` |
| Message-only search | `unblocked context-search-messages --query "<query>" --instruction "<instruction>"` | `context_research` with `instruction: "Prefer Slack threads and team conversations; deprioritize code and docs"` |
| Cross-repo code search | `unblocked context-search-code --query "<query>" --instruction "<instruction>"` | `context_research` with `instruction: "Prefer code and implementation results; deprioritize docs, issues, and messages"` |
| Filtered issue enumeration | `unblocked context-query-issues --query "<query>" --projects <project...> --user-name "<person>"` | No complete MCP equivalent; use `context_research` with issue-filter steering only when completeness is not required |
| Filtered PR enumeration | `unblocked context-query-prs --query "<query>" --projects <repo...> --user-name "<person>"` | No complete MCP equivalent; use `context_research` with PR-filter steering only when completeness is not required |
| Resolve known URLs | `unblocked context-get-urls --urls "<url1>" "<url2>"` | `context_get_urls` with `urls` |

Use `effort: high` for architecture, planning, migration, and multi-system
decisions; `medium` for exploratory unknowns; and `low` for targeted lookups
anchored on a specific file, class, PR, issue, or URL.

For known URLs, use `context_get_urls` / `unblocked context-get-urls` instead
of search. If search results surface concrete URLs but snippets are not enough,
resolve the most relevant URLs before making a recommendation.

For domain context, start with a broad query shaped like:

```text
What domain terminology, product requirements, design docs, issue history,
PR history, and team discussions are relevant to <plan/topic> in <repo/system>?
```

Use `instruction` to prefer durable documentation and decision artifacts first,
then PRs/issues/messages for supporting context. If the first pass is thin, ask
one targeted follow-up query using the strongest identifiers from the results.

Write queries with the strongest identifiers available: repo name, feature
name, class, method, endpoint, file path, issue key, PR number, channel name,
date range, or owner. Split independent unknowns into separate queries.

## Confidence

Every recommendation must include a confidence level:

- **High**: Local code and/or primary artifacts from `context_research` or a
  focused `context_search_*` tool agree, or the tool returns high confidence with
  strong supporting evidence.
- **Medium**: Evidence points in one direction but is incomplete, indirect, or
  based on only one source type.
- **Low**: Evidence is thin, conflicting, stale, or mostly inferred.

If `context_research`, `context_search_*`, `context_query_*`, or
`context_get_urls` returns an explicit confidence score or label, report it. Do
not invent a numeric score. If the tool does not return explicit confidence,
derive a High/Medium/Low label from evidence strength and say what it is based
on.

When evidence conflicts, state the conflict directly, lower the confidence, and
ask the next question to resolve the uncertainty.

Use this compact response shape for each step:

```md
Recommendation: ...
Confidence: High|Medium|Low - based on ...
Evidence: ...
Question: ...
```

Keep the evidence line short. Mention the most important artifact types, not a
dump of every result.

## During The Session

### Challenge Against The Glossary

When the user uses a term that conflicts with domain language returned by
`context_research` or a focused `context_search_*` tool, call it out
immediately:

> `context_search_documentation` points to "cancellation" meaning X, but you
> seem to mean Y. Which is it?

### Sharpen Fuzzy Language

When the user uses vague or overloaded terms, propose a precise canonical term:

> You're saying "account". Do you mean the Customer or the User? Those are
> different concepts.

### Discuss Concrete Scenarios

When domain relationships are being discussed, stress-test them with specific
scenarios. Invent scenarios that probe edge cases and force precision around
boundaries between concepts.

### Cross-Reference With Code

When the user states how something works, check whether the code agrees. If the
code contradicts the user's statement, surface it and include confidence:

> Recommendation: Treat cancellation as order-level unless we decide to expand
> the model.
> Confidence: High - based on the local `Order.cancel()` behavior and tests.
> Evidence: Code cancels entire Orders; no line-item cancellation path found.
> Question: Should partial cancellation become a new domain capability, or was
> "partial" shorthand for cancelling one of several Orders?

### Cross-Reference With Routed Unblocked Tools

When the user states why something works this way, what the team prefers, what
was tried before, or what other systems expect, run `context_research` first
unless the source type is already obvious. If the source type is obvious, use
the focused tool:

- `context_search_prs` for PR history and change reasoning.
- `context_search_messages` for team discussion.
- `context_search_issues` for planned, blocked, duplicate, or bug-reported
  work.
- `context_search_documentation` for design docs, runbooks, and product docs.
- `context_search_code` for cross-repo implementation patterns.
- `context_get_urls` for concrete PR, issue, doc, or message URLs.

If results contradict the user's statement, surface the contradiction:

> Recommendation: Keep Billing consuming domain events instead of adding a
> synchronous Ordering call.
> Confidence: Medium - Unblocked found prior PR discussion favoring events, but
> no current decision doc.
> Evidence: PR discussion cites retry isolation; local code still follows that
> pattern.
> Question: Is the new requirement strong enough to revisit that integration
> boundary?

### Capture Resolved Terms

Use `context_research` for broad domain context, then switch to
`context_search_documentation`, `context_search_prs`, `context_search_issues`,
or `context_search_messages` when the relevant source type is clear.

When a term is resolved, capture it in the conversation immediately in compact
form:

```md
Resolved term: **Name** - one-sentence domain definition.
Avoid: ambiguous aliases.
Evidence: `context_search_documentation`, `context_search_issues`,
`context_search_prs`, `context_search_messages`, and local code, as applicable.
Confidence: High|Medium|Low - based on ...
```

Only create or update a local documentation artifact if the user explicitly
asks for one. If that happens, do not paste private messages or issue text into
the file; summarize the stable domain language that the team agreed to.

## Local Documentation

Use `context_research` and the focused `context_search_*` tools to establish
domain context. Local docs are only for persistence after the conversation has
resolved a term or decision.

If the user asks to write local docs:

- Use existing project conventions if obvious.
- If no convention exists, write the smallest useful note that records the
  resolved term or decision.
- Keep private-source details out of local docs. Record durable conclusions and
  artifact references, not private transcript text.
