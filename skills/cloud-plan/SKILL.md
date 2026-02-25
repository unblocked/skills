---
name: cloud-plan
description: >
  Produces self-contained plans for headless and cloud agents that can't access
  Unblocked MCP during execution. Front-loads all context gathering locally,
  embeds organizational context directly in the plan (inline quotes, not
  references), and packages everything a cloud agent needs into a single
  markdown document. Use when creating plans for CI/CD pipelines, remote Claude,
  or any headless agent execution.
---

# Cloud-Ready Planning

Cloud agents (Anthropic remote Claude, CI/CD pipelines, `claude --headless`) can't run
MCP servers during execution — they lack organizational context at runtime. This skill
front-loads all context gathering locally and produces a **self-contained plan document**
that embeds everything the cloud agent needs.

The key difference from the standard `unblock` skill: context is **embedded inline**,
not referenced. The cloud agent gets quotes, conventions, and patterns directly in the
plan — not tool names to query.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. HYDRATE DEEPLY (Unblocked)                               │
│     │              Extended context gathering —              │
│     │              more than standard, because the           │
│     │              cloud agent can't query later             │
│     ▼                                                        │
│  2. PLAN WITH      (Agent)                                   │
│     │ EMBEDDED     Inline quotes, not references —           │
│     │ CONTEXT      everything the cloud agent needs          │
│     │              is in the document                        │
│     ▼                                                        │
│  3. REVIEW         (Unblocked)                               │
│     │              Validate plan completeness —              │
│     │              is enough context embedded?               │
│     ▼                                                        │
│  4. PACKAGE        (Agent)                                   │
│     │              Self-contained markdown for               │
│     │              headless consumption                      │
│     ▼                                                        │
│     DONE — plan is ready for cloud agent                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Embed, don't reference.** The cloud agent can't call Unblocked. Every piece of context it needs must be in the document.
- **Over-gather context.** Better to include extra context than to have the cloud agent guess. The cost of extra gathering is seconds; the cost of a context-blind cloud agent is a bad implementation.
- **Include examples from the codebase.** Show the cloud agent what the team's code looks like — paste relevant code snippets, not descriptions.
- **Be explicit about constraints.** What the cloud agent must NOT do is as important as what it should do.
- **The plan is the only input.** Assume the cloud agent has no other context beyond this document and the codebase files.

---

## Phase 1: Hydrate Deeply (Unblocked)

Gather **more context than the standard `unblock` skill** — because the cloud agent
can't query Unblocked during execution.

**Required queries (all of these):**

1. `unblocked_context_engine`: "How does [feature area] work in this codebase?"
2. `unblocked_context_engine`: "What conventions does the team follow for [relevant pattern]?"
3. `unblocked_context_engine`: "What are the team's naming conventions for [files, functions, variables] in [area]?"
4. `historical_context`: "What decisions were made about [related area]?"
5. `data_retrieval`: recent PRs and issues related to the area
6. `historical_context`: "Has the team tried [this kind of change] before?"
7. `unblocked_context_engine`: "What are the known gotchas or edge cases in [area]?"
8. `unblocked_context_engine`: "What testing patterns does the team use for [area]?"
9. `unblocked_context_engine`: "What error handling patterns does the team use in [area]?"

**Additional deep queries:**

10. `unblocked_context_engine`: "What utilities and helpers exist in [area] that should be reused?"
11. `historical_context`: "What are the active migrations or direction changes in [area]?"
12. `data_retrieval`: recent PR review comments in the area — reveals enforced conventions

**Save all raw responses.** They'll be embedded in the plan.

---

## Phase 2: Plan with Embedded Context (Agent)

Draft the plan with **inline context** — not tool names or references, but actual
quotes, code snippets, and conventions.

### Embedding Rules

**Instead of:**
> Follow the team's error handling pattern

**Write:**
> Follow the team's error handling pattern: wrap service calls in try/catch, log with
> `logger.error({ err, context })`, and return `{ error: string, code: number }`. Example
> from `src/api/users.ts:45-60`:
> ```typescript
> try {
>   const user = await userService.getById(id);
>   return { data: user };
> } catch (err) {
>   logger.error({ err, context: 'getUser' });
>   return { error: 'Failed to fetch user', code: 500 };
> }
> ```

**Instead of:**
> Check Unblocked for related PRs

**Write:**
> Related PRs:
> - PR #567 "Add rate limiting to API" — introduced the `rateLimit` middleware in
>   `src/middleware/rateLimit.ts`. Uses express-rate-limit with Redis store.
> - PR #890 "Refactor middleware pipeline" — established the pattern of middleware
>   registration in `src/middleware/index.ts`.

### Plan Structure

The plan document must include:

1. **Task description** — what to implement
2. **Embedded conventions** — team patterns with code examples
3. **Embedded prior art** — relevant PRs and decisions with details
4. **File map** — exact files to create/modify with expected content structure
5. **Step-by-step instructions** — specific enough for a context-blind agent
6. **Constraints** — what NOT to do (as important as what to do)
7. **Verification steps** — how to confirm the implementation is correct

---

## Phase 3: Review (Unblocked)

Validate that the plan embeds enough context for a cloud agent.

**Required queries:**

1. `unblocked_context_engine`: "Is there any additional context about [area] that we haven't included?"
2. `unblocked_context_engine`: "Are there any conventions or patterns we missed?"

**Review checklist:**
- [ ] Every convention is shown with an example, not just described
- [ ] All relevant prior PRs are summarized with key details
- [ ] File paths are exact and correct
- [ ] Constraints are explicit (what NOT to do)
- [ ] Verification steps are concrete and testable
- [ ] The plan makes sense without any external context

---

## Phase 4: Package (Agent)

Finalize the plan as a self-contained markdown document. Use the template in
`references/cloud-plan-template.md`.

### Output Options

1. **Save to file** — for use with `claude --headless --plan [file]` or similar
2. **Print to console** — for copy-paste into cloud agent interfaces
3. **Save to handoffs** — for pickup by a future session running headless

**Present the final document and confirm with the user how they want to use it.**

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Specific PR/issue details | `link_resolver` |
| Team patterns and conventions | `unblocked_context_engine` |
| Debugging known failures | `failure_debugging` |
