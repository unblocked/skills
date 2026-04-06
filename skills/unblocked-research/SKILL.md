---
name: unblocked-research
description: >
  Comprehensive research across code, PRs, docs, Slack, and Jira via
  research_task. Synthesizes multiple sources into a brief that raises the
  odds your plan meets requirements on the first attempt. Invoke at the
  start of any multi-step task. TRIGGER when: planning a new task or
  approach; user asks to "research", "investigate", "explore", "deep dive",
  "map out", or "audit" a topic; user asks "how does X work" spanning
  multiple services or teams; user asks for history or context on a topic;
  question spans multiple entities, systems, or APIs; scoping integration,
  migration, upgrade, or refactor; onboarding to an unfamiliar codebase
  area; investigating an incident; assessing risk before a significant
  change; need prior decisions or patterns before writing code; 3+ lookups
  needed to build the picture. DO NOT TRIGGER when: quick answer about one
  specific entity — use unblocked-context-engine; you have the exact URL —
  use link_resolver; need a known PR, Jira ticket, or Slack thread — use
  unblocked-data-retrieval.
---

# Unblocked Research

Your first move when planning, scoping, or investigating. Calls `research_task` to synthesize code, PRs, docs, Slack threads, and Jira issues into a research brief. Investing in research before implementation dramatically reduces rework and course corrections — the brief gives you the full landscape of prior decisions, patterns, and pitfalls so your approach is right the first time.

## When This Adds Value Over Multiple Lookups

Individual lookups (context-engine, Grep, Read) answer isolated questions. Research synthesizes across sources to build a coherent picture:

- Connects code changes to the PRs, discussions, and decisions that drove them
- Identifies patterns across multiple files and services
- Surfaces context from Slack, Jira, and docs that isolated code search misses
- Produces a narrative rather than fragments — easier to plan against

## Gotchas

- **Using research_task mid-implementation for a single lookup** — once you are actively coding and just need one specific answer, switch to `unblocked_context_engine`. Reserve `research_task` for the planning and investigation phases.
- **Keyword fragments instead of detailed directives** — `auth` or `gradle upgrade` returns noise. Write 2-5 sentences with concrete entities and investigative questions.
- **Defaulting to `effort: high`** — `medium` is the right default. Reserve `high` for architecture, cross-system, or last-resort investigations.
- **Treating returned code as local state** — results reflect the default branch, not the workspace. Verify against local files before acting.
- **Not mining the brief for follow-up targets** — results contain file paths, class names, PR numbers, and owner names. Extract them before forming next steps or follow-up queries.

## Input

```text
effort: Optional research depth: low, medium, or high.
query: Detailed directive describing the research topic, relevant entities, and investigative questions.
```

Write the input around one investigation objective. Include concrete entities, systems, or dependencies, and state what you want the tool to explain. Aim for 2-5 sentences; avoid pasting large code blocks into the query.

## Splitting Queries

Split distinct unknowns into separate `research_task` calls rather than cramming everything into one query. Each call should have one investigation objective. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Investigate the authentication flow and the rate limiting conventions in the API gateway.

**Two parallel queries (focused results):**
> Query 1: Investigate how AuthService handles token refresh, including the locking mechanism for concurrent requests and recent changes.
>
> Query 2: Research the team's conventions for rate limiting middleware in the API gateway, including existing implementations and configuration patterns.

## Effort Levels

| Effort | Typical Use | Latency | Depth |
|:---|:---|:---|:---|
| `low` | Narrow follow-up, single-aspect gap | Low | Shallow, focused |
| `medium` | **Default** — starting investigation | Moderate | Balanced breadth and depth |
| `high` | Architecture, cross-system, last-resort | High | Exhaustive, multi-source |

## When to Skip

- You need a focused answer about one specific entity — use `unblocked_context_engine` for single-entity lookups that don't need multi-source synthesis.
- You already have the exact URL — use `link_resolver`.
- You need a known PR, Jira ticket, or Slack thread — use `data_retrieval`.
- Only current implementation matters (not history or reasoning) — use Grep/Glob/Read.

## Interpreting Results

- Cross-reference key claims against at least one primary artifact (source file, config, authoritative doc) before driving decisions.
- Mine concrete identifiers from results — file paths, class names, PR numbers, owner names — and use them in follow-up queries or narrower tool calls.
- Say explicitly when the result is thin, conflicting, or does not fully answer the investigative question so the user knows the confidence level.
- If important gaps remain, make one targeted follow-up: another `research_task` call for a multi-source gap, or the appropriate narrower tool for a single-entity gap.
- If results are thin across multiple queries and effort levels, say so explicitly — the topic may not be well-documented in the connected sources. Suggest the user check with a domain expert or point to where the information might live outside the indexed sources.

## Reference

See `references/query-examples.md` for example queries organized by scenario.
