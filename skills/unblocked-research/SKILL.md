---
name: unblocked-research
description: >
  Comprehensive research across code, PRs, docs, Slack, and Jira via
  research_task. Synthesizes multiple sources into a research brief that
  dramatically raises the odds your plan meets requirements on the first
  attempt with minimal course corrections. Invoke this skill proactively at
  the start of any multi-step task before committing to an approach.
  TRIGGER when: starting a new task and need to plan an approach; user asks to
  "research", "investigate", "look into", "explore", or "understand" a topic;
  the question spans multiple entities, systems, or APIs; scoping integration,
  migration, or upgrade work; you need to understand prior decisions, rejected
  approaches, or existing patterns before writing code; prior exploration
  hasn't converged and you need 3+ lookups to build the picture.
  DO NOT TRIGGER when: you are mid-implementation and need a quick answer
  about one specific class, method, or service — use unblocked-context-engine
  for single-entity lookups during active coding.
---

# Unblocked Research

Your first move when planning, scoping, or investigating. Calls `research_task` to synthesize code, PRs, docs, Slack threads, and Jira issues into a research brief. Investing in research before implementation dramatically reduces rework and course corrections — the brief gives you the full landscape of prior decisions, patterns, and pitfalls so your approach is right the first time.

## Gotchas

- **Using research_task mid-implementation for a single lookup** — once you are actively coding and just need one specific answer, switch to `unblocked_context_engine`. Reserve `research_task` for the planning and investigation phases.
- **Keyword fragments instead of detailed directives** — `auth` or `gradle upgrade` returns noise. Write 2-5 sentences with concrete entities and investigative questions.
- **Defaulting to `effort: high`** — `medium` is the right default. Reserve `high` for architecture, cross-system, or last-resort investigations.
- **One sprawling query instead of scoped calls** — split distinct unknowns into separate `research_task` calls (possibly parallel) rather than cramming everything into one query.
- **Treating returned code as local state** — results reflect the default branch, not the workspace. Verify against local files before acting.
- **Not mining the brief for follow-up targets** — results contain file paths, class names, PR numbers, and owner names. Extract them before forming next steps or follow-up queries.

## Input

```text
effort: Optional research depth: low, medium, or high.
query: Detailed directive describing the research topic, relevant entities, and investigative questions.
```

Write the input around one investigation objective. Include concrete entities, systems, or dependencies, and state what you want the tool to explain. Aim for 2-5 sentences; avoid pasting large code blocks into the query.

## Effort Levels

| Effort | Typical Use | Latency | Depth |
|:---|:---|:---|:---|
| `low` | Narrow follow-up, single-aspect gap | Low | Shallow, focused |
| `medium` | **Default** — starting investigation | Moderate | Balanced breadth and depth |
| `high` | Architecture, cross-system, last-resort | High | Exhaustive, multi-source |

## When to Skip

- You are mid-implementation and the question targets one entity — use `unblocked_context_engine`.
- You already have the exact URL — use `link_resolver`.
- You need a known PR, Jira ticket, or Slack thread — use `data_retrieval`.
- Only current implementation matters (not history or reasoning) — use Grep/Glob/Read.

## Interpreting Results

- Cross-reference key claims against at least one primary artifact (source file, config, authoritative doc) before driving decisions.
- Mine concrete identifiers from results — file paths, class names, PR numbers, owner names — and use them in follow-up queries or narrower tool calls.
- Say explicitly when the result is thin, conflicting, or does not fully answer the investigative question so the user knows the confidence level.
- If important gaps remain, make one targeted follow-up: another `research_task` call for a multi-source gap, or the appropriate narrower tool for a single-entity gap.

## Reference

See `references/query-examples.md` for example queries organized by scenario.
