---
name: unblock-cloud-plan
description: >
  Produces self-contained plans for headless and cloud agents that can't access
  Unblocked MCP during execution. Front-loads all context gathering locally,
  embeds organizational context directly in the plan (inline quotes, not
  references), and packages everything a cloud agent needs into a single
  markdown document. Use when creating plans for CI/CD pipelines, remote Claude,
  or any headless agent execution.
---

# Cloud-Ready Planning

Cloud agents can't run MCP servers during execution — they lack organizational context
at runtime. This skill front-loads context gathering and produces a **self-contained plan**
with everything embedded inline.

## Rules

- **Embed, don't reference.** The cloud agent can't call Unblocked. Every piece of context must be in the document.
- **Include code examples.** Show the cloud agent what the team's code looks like — paste snippets, not descriptions.
- **Be explicit about constraints.** What the agent must NOT do is as important as what it should do.

---

## Phase 1: Hydrate Deeply (Unblocked)

Gather **more context than standard** — the cloud agent can't query later.

**Required queries:**

1. `unblocked_context_engine`: "How does [feature area] work?"
2. `unblocked_context_engine`: "What conventions for [relevant pattern]?"
3. `unblocked_context_engine`: "Naming conventions for [files, functions, variables] in [area]?"
4. `historical_context`: "What decisions about [related area]?"
5. `data_retrieval`: recent PRs and issues in the area
6. `historical_context`: "Has the team tried [this kind of change] before?"
7. `unblocked_context_engine`: "Known gotchas or edge cases in [area]?"
8. `unblocked_context_engine`: "Testing patterns for [area]?"
9. `unblocked_context_engine`: "Error handling patterns in [area]?"

**Additional deep queries:**

10. `unblocked_context_engine`: "What utilities and helpers exist in [area] to reuse?"
11. `historical_context`: "Active migrations or direction changes in [area]?"
12. `data_retrieval`: recent PR review comments — reveals enforced conventions

Save all raw responses for embedding.

---

## Phase 2: Plan with Embedded Context (Agent)

Draft the plan with **inline context** — actual quotes, code snippets, and conventions.

### Embedding Rules

**Instead of:** "Follow the team's error handling pattern"
**Write:** "Wrap service calls in try/catch, log with `logger.error({ err, context })`, return `{ error: string, code: number }`. Example from `src/api/users.ts:45-60`: [paste code]"

**Instead of:** "Check related PRs"
**Write:** "PR #567 introduced `rateLimit` middleware in `src/middleware/rateLimit.ts` using express-rate-limit with Redis store."

### Plan Structure

1. **Task description** — what to implement
2. **Embedded conventions** — team patterns with code examples
3. **Embedded prior art** — relevant PRs and decisions with details
4. **File map** — exact files to create/modify
5. **Step-by-step instructions** — specific enough for a context-blind agent
6. **Constraints** — what NOT to do
7. **Verification steps** — how to confirm correctness

---

## Phase 3: Review (Unblocked)

Validate the plan embeds enough context.

1. `unblocked_context_engine`: "Any additional context about [area] we haven't included?"
2. `unblocked_context_engine`: "Any conventions or patterns we missed?"

**Checklist:**
- [ ] Every convention shown with example, not just described
- [ ] All relevant PRs summarized with key details
- [ ] File paths exact and correct
- [ ] Constraints explicit
- [ ] Verification steps concrete and testable
- [ ] Plan makes sense without external context

---

## Phase 4: Package (Agent)

Finalize as self-contained markdown. Use `references/cloud-plan-template.md`.

**Output options:**
1. Save to file — for `claude --headless --plan [file]`
2. Print to console — for copy-paste
3. Save to handoffs — for future headless session

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
