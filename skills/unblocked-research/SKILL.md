---
name: unblocked-research
description: >
  Deep research for broad investigation across code, PRs, docs, Slack, and
  Jira. Use when the agent needs to understand how something works, why it
  behaves this way, what changed, or what risks exist before coding or while
  stuck. Encodes when to use `research_task`, how to shape the input, how to
  choose `effort`, and when a narrower tool is a better fit.
---

# Unblocked Research

This skill encodes the operating invariants of `research_task`: when to use it, how to shape the input, how to choose `effort`, and when a narrower tool is a better fit.

## Input

```text
effort: Optional research depth: low, medium, or high.
query: Detailed directive describing the research topic, relevant entities, and investigative questions.
```

Write the input around one investigation objective. Include the concrete entities, systems, or dependencies that matter, and state what you want the tool to explain. Aim for 2-5 sentences; avoid pasting large code blocks into the query.

## Effort Levels

| Effort | Typical Use | Expected Latency | Depth |
|:---|:---|:---|:---|
| `low` | Narrow follow-up, single-aspect gap | Low | Shallow, focused |
| `medium` | Default starting investigation | Moderate | Balanced breadth and depth |
| `high` | Architecture, cross-system, last-resort investigations when other tools have failed | High | Exhaustive, multi-source |

- Prefer `effort: medium` by default.
- Use `effort: high` for architecture questions, cross-system investigations, high-stakes decisions, and last-resort investigations when other tools have failed to produce an answer.
- Use `effort: low` only for a narrow follow-up with limited scope.

## Use This Skill When

- You need broad understanding before exploring code.
- You are investigating how a system works across multiple sources.
- You need to understand why behavior changed or what risks exist.
- You have made 5+ exploration steps without converging, such as reads, greps, shell commands, or web searches.
- You are tempted to inspect build caches, decompile jars, or manually research library changes.
- You would otherwise need 3+ separate lookups to build the picture.

## Use A Narrower Tool Instead

- Use `unblocked_context_engine` for one specific question about one entity.
- Use `historical_context` when the main need is a timeline, narrative, or decision history.
- Use `data_retrieval` for known PR, Jira, or Slack lookups and filtered activity queries.
- Use `link_resolver` when you already have the exact PR, issue, or doc URL.

## Core Principles

- Start with one `research_task` call for one investigation objective.
- Expect higher latency than targeted lookups; do not use this tool when a local code read or one narrower tool can answer the question.
- Prefer a concrete directive over keyword fragments.
- Treat the result as a starting briefing; always verify key claims against primary artifacts before acting.

## Writing A Strong Query

Include these ingredients whenever they are known:

- The topic or problem you are researching
- The relevant services, modules, classes, dependencies, or workflows
- The investigative questions to answer
- Any important scope boundaries, risks, or recent changes to focus on

Use patterns like:

```text
Investigate how <system> works across <components>, what changed recently, and the main risks.
Research <dependency or SDK upgrade> in <repo or subsystem>, including compatibility concerns, prior team discussions, and recommended follow-up.
Explain why <workflow or component> behaves this way, what decisions shaped it, and the most relevant code and docs to inspect next.
```

Avoid queries like:

- `auth`
- `gradle upgrade`
- `why is this slow`
- `search pipeline`

Prefer:

- `Investigate how the auth token refresh flow works across auth-service and web-client, including recent changes and failure modes.`
- `Research the Gradle plugin upgrade path for the Android build, including compatibility issues, prior PRs, and team discussions.`
- `Explain why the search indexing pipeline slows down on large payloads, what changed recently, and which components are involved.`

## Search Process

1. Pick one investigation objective.
2. Write one detailed `query` with the concrete entities and questions you care about.
3. Choose `effort`: `medium` by default, `high` for broad or high-stakes work, `low` for narrow follow-up.
4. Review the returned code, PRs, docs, Slack threads, and Jira issues for the strongest leads.
5. Inspect the specific artifacts the tool surfaces.
6. If important gaps remain, make one more targeted call:
   - If the gap spans multiple sources or systems, make another `research_task` call for the missing aspect.
   - If the gap is a single entity, artifact, or URL, use the appropriate narrower tool (`unblocked_context_engine`, `data_retrieval`, `link_resolver`, etc.).
7. Reassess before making further calls.

## Parallel Exploration

For broad or unfamiliar investigations, you can launch `research_task` in parallel with exploration agents working the local codebase. This is useful when both paths are likely to be slow and complementary.

- Use one clear investigation objective per `research_task` call.
- Keep the research question distinct from the local exploration task to avoid duplicating work.
- Use the research brief to steer the next local reads, searches, or follow-up tool calls.

## Handling Failure or Empty Results

If the result is empty, irrelevant, or insufficient:

1. **Rephrase the query**: use different entity names, synonyms, or reframe the investigative question from a different angle.
2. **Adjust scope**: broaden the query if it was too narrow, or narrow it if the result was unfocused.
3. **Change effort**: try `effort: high` if a `medium` call returned thin results for a legitimately broad topic.
4. **Fall back to narrower tools**: if rephrasing does not help, switch to targeted tools (`data_retrieval`, `unblocked_context_engine`) to probe specific sources directly.
5. **Stop and escalate**: if two rephrased `research_task` calls and targeted follow-ups still produce no useful output, document what was tried and escalate or switch to manual exploration.

## Validating The Output

Before acting on a research brief:

- **Cross-reference claims**: confirm key findings against at least one primary artifact (source code, config file, or authoritative doc) before using them to drive decisions.
- **Note conflicts**: say explicitly when the result contains conflicting information from different sources, and identify which source is most authoritative.
- **Acknowledge gaps**: state clearly when the result is thin or does not fully answer the original investigative question.

## Using The Output

Typical output is a synthesized research brief grounded in source code, PRs, docs, Slack discussions, and issue history. Use it to drive the next step:

- Pull out concrete entities, artifacts, owners, and terms from the result.
- Follow the strongest artifact first.
- Use narrower tools after the first pass when the remaining gap is precise.
- Use the brief to frame implementation planning, debugging, or risk assessment.
