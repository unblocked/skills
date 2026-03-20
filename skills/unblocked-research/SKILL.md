---
name: unblocked-research
description: >
  Deep research via research_task for broad investigation across code, PRs,
  docs, Slack, and Jira. Use when the user asks to "research", "investigate",
  "look into", or "explore" a topic, or when the question spans multiple
  entities, systems, or APIs (e.g., planning integration, migration, or upgrade
  work). Also use when you need 3+ separate lookups to build the picture, or
  when prior exploration hasn't converged. Encodes how to shape the input, how
  to choose effort, and when a narrower tool is a better fit. For a focused
  question about one specific entity, use unblocked-context-engine instead.
---

# Unblocked Research

Calls `research_task` for multi-source investigation — synthesizing code, PRs, docs, Slack threads, and Jira issues into a research brief. Higher latency than targeted lookups, but covers ground that would otherwise take many separate tool calls.

## Gotchas

- **Using research_task when a narrower tool suffices** — `research_task` has higher latency. Use `unblocked_context_engine` for one question about one entity, `data_retrieval` for known PR/Jira/Slack lookups, `link_resolver` for a URL you already have.
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

- The question targets one entity — use `unblocked_context_engine`.
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
