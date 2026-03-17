---
name: unblocked-context-engine
description: >
  Targeted lookup for ONE specific question about ONE specific entity. Returns
  code, PRs, docs, Slack discussions, and Jira issues. Call this tool: at the
  START to disambiguate the user's query; before ENTERING a new class, module,
  or subsystem you haven't read yet; when you want to CHECK if a bug or pattern
  is already known; when earlier context DOESN'T MATCH what you see in the code
  and you need to check if the situation has changed. Query rules: each query
  MUST ask exactly one question about one entity. Include concrete identifiers:
  service names, class names, method names. Call this tool multiple times in
  parallel with focused queries rather than once with a broad query.
---

# Unblocked Context Engine

This skill encodes the operating invariants of `unblocked_context_engine`: what kind of question it answers, how queries must be shaped, and how to interpret the returned code, PRs, docs, Slack discussions, and Jira issues. Use it when an agent needs institutional context that is not obvious from local code alone.

## Input

```text
query: Semantic query targeting a single, specific piece of context.
```

Write the input as one focused question about one entity. Include concrete identifiers whenever possible:

- Service names
- Class names
- Method names
- File paths
- Endpoints
- Decision topics

Examples:

```text
What is AuthStore and how is it used in the codebase?
How does auth-service token refresh work?
What conventions does the team follow for rate limiting middleware in the API layer?
What PR or doc explains the search registry design?
```

## Core Principles

- Ask ONE question about ONE entity per call.
- Prefer multiple focused queries over one broad query.
- Start with the best identifier you have, even if it is imperfect.
- This tool is read-only. It cannot modify code or create side effects.
- Use this tool at the start when you need to disambiguate the request.
- Use it before entering an unfamiliar class, module, or subsystem.
- Use it to check whether a bug, pattern, or prior approach is already known.
- Use it again when the returned context does not match what you see in code.
- Treat results as leads, not a stopping point.

## Search Process

1. Pick one entity and one information need.
2. Write a focused query using concrete identifiers.
3. Review the returned code, PRs, docs, Slack threads, and Jira issues.
4. Extract stronger nouns from the results: file paths, class names, PR numbers, internal terms, owners, or related components.
5. Re-query with a narrower question or a different angle on the same entity.
6. If the task involves multiple entities or multiple unknowns, split them into separate focused queries and run them in parallel.
7. When results point to a specific artifact, inspect that artifact directly and then decide whether another query is still needed.

## Query Patterns

Use patterns like:

```text
How does <entity> work in <repo or subsystem>?
What conventions does the team follow for <pattern> in <area>?
What are the known gotchas in <workflow or component>?
What PR, doc, or discussion explains <decision topic>?
Why does <component> behave this way?
```

Avoid queries like:

- `auth`
- `rate limiting`
- `planning`
- `search registry`

Prefer:

- `How does the auth-service token refresh flow work?`
- `What conventions does the team follow for rate limiting middleware in the API layer?`
- `What are the known gotchas in the planner loop for answer refinement?`
- `What PR or design doc explains the agentic search registry design?`

## Using the Output

Typical output includes the most relevant source code, PRs, docs, Slack conversations, and issues for the query. Use that output to drive the next step:

- Treat returned source code as reference context for the default branch, not necessarily for the current local workspace.
- Pull out concrete entities from the returned snippets.
- Follow links and referenced artifacts inside the results when they look promising.
- Follow the strongest lead first.
- Re-query if the result is promising but incomplete.
- Re-query if the result answers only part of the question.
- Use extracted entities to drive follow-up retrieval or code exploration.
- Say explicitly when the tool returned thin or conflicting context.
