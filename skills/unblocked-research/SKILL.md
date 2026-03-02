---
name: unblocked-research
description: >
  Deep research workflow. Use this skill when the goal is understanding: how
  something works, why it behaves this way, what changed, and what risks exist.
  Prefer one `mcp__unblocked__research_task` call over multiple MCP lookups.
---

# Deep Research (Simple Mode)

Use this skill for investigation and explanation tasks where the primary output is understanding.

## Trigger

Run this skill when the user asks to:
- investigate, analyze, debug root cause, or triage
- explain architecture, behaviour, or data flow
- summarize history, decisions, or risks
- gather context before implementation planning

Use these alternatives instead of `research_task` when the request is narrow:
- `mcp__unblocked__data_retrieval`: known PR/Jira/Slack records, or filtered activity lookups.
- `mcp__unblocked__link_resolver`: hydrate one or more known GitHub PR/issue URLs.
- `mcp__unblocked__historical_context`: focused history questions (`how`, `what`, `when`) about known components/decisions.
- `mcp__unblocked__unblocked_context_engine`: one targeted semantic lookup for team conventions, terminology, or prior decisions.

## Default Behavior

1. Start with one `mcp__unblocked__research_task` call.
2. Use `effort: medium` by default.
3. Use `effort: high` for high-stakes or cross-system investigations.
4. Use `effort: low` only for narrow, low-risk questions.
5. For one research objective, do not call multiple MCP tools up front.
6. If there are multiple independent research objectives, parallel `mcp__unblocked__research_task` calls are allowed (one objective per call).
7. For follow-up gaps within one objective, run one additional targeted tool call at a time, then reassess.

## research_task Input

`research_task` has one required input: `query`.

Write `query` in normal language. There is no fixed template.

Guidance:
- Keep one topic per call.
- Keep the objective clear, but phrased naturally.
- Default to broad scope; add boundaries only when the user asks or when a first pass is too noisy.
- If you need multiple topics, run multiple `research_task` calls (one topic per call).

Examples:

```text
Research how [topic] works in this codebase.
```

```text
Investigate [topic] and explain what changed recently.
```

```text
Help me understand [topic] and the main risks.
```

## Follow-Ups

Only run extra calls if critical gaps remain:
- Prefer a second focused `research_task` call for the missing gap.
- If the missing gap is a specific record set (PR/Jira/Slack), use `mcp__unblocked__data_retrieval`.
- If the missing gap is details behind known GitHub PR/issue links, use `mcp__unblocked__link_resolver`.
- If the missing gap is historical sequence or decision timeline, use `mcp__unblocked__historical_context`.
- If the missing gap is team convention/terminology/previous approach context, use `mcp__unblocked__unblocked_context_engine`.
- Run one follow-up tool call per gap, then reassess.
