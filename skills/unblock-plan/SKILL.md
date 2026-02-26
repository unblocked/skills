---
name: unblock-plan
description: >
  Context-rich planning — hydrates and validates implementation plans against
  org knowledge (PRs, Slack, Jira, docs, code history). Produces a reviewed,
  implementable plan. Does not generate code.
---

# Unblocked Planning Workflow

Produces a context-grounded, critically reviewed implementation plan. Does not generate code.

## Rules

- **Multiple specific queries > one broad query.** Ask 3-4 focused questions, not one vague one.
- **Plans must name files, patterns, and decisions.** Vague plans can't be reviewed. Output must be implementable by any engineer or agent.
- **Default to existing patterns.** Follow what Unblocked shows the team does.

## Reference Workflows

For specialized task types, load the relevant reference file:

- **Debugging a bug** → `references/debugging-context.md`
- **Implementing a feature** → `references/feature-context.md`
- **Exploring unfamiliar code** → `references/exploring-context.md`

---

## Phase 1: Hydrate Context (Unblocked)

Gather context before planning. Run **multiple targeted queries**:

1. `unblocked_context_engine`: "How does [feature area] work in this codebase?"
2. `unblocked_context_engine`: "What conventions does the team follow for [relevant pattern]?"
3. `historical_context`: "What decisions were made about [related area]?"
4. `data_retrieval`: recent PRs and issues related to the area
5. `historical_context`: "Has the team tried [this kind of change] before? What happened?"
6. `unblocked_context_engine`: "What are the known gotchas or edge cases in [area]?"

**Carry forward:** existing modules to extend, naming/style conventions, architectural patterns, related recent work, prior decisions and rejected approaches.

**Do not start planning without this context.**

---

## Phase 2: Draft Plan (Agent)

Design the implementation **referencing specific findings from Phase 1**.

**The plan must:**
- Name the existing modules, utilities, and patterns it will follow
- Align with prior team decisions from hydration
- Note any divergence from existing patterns and explain why
- Identify files to create or modify
- Be detailed enough for critical review

**Do NOT write vague plans.** "Add middleware for rate limiting" cannot be reviewed. "Add a `rateLimiter` middleware in `src/middleware/` following the `authMiddleware` pattern, using `express-rate-limit` from `package.json`, storing counters in Redis via `src/lib/redis`" can be.

---

## Phase 3: Review Plan (Unblocked)

**CRITICAL GATE — Do not skip.**

Submit the plan for critical review before it's considered complete.

1. `unblocked_context_engine`: "We plan to [approach]. Does this align with how [related system] works? Existing patterns we should follow instead?"
2. `unblocked_context_engine`: "We plan to modify/create [files]. What do we need to know about these files and their dependencies?"
3. `historical_context`: "Has the team tried [planned approach] before? Problems or rejected alternatives?"
4. `unblocked_context_engine`: "What could go wrong with [approach]? Edge cases, performance, integration issues?"

**Look for:** pattern mismatches, missing context, rejected approaches, naming/convention violations, scope blindness.

State what the review found, whether the plan needs revision, and what changes are needed.

---

## Phase 4: Revise & Output (Agent)

Incorporate all feedback. For each finding: state what was found, how the plan is updating, and if you disagree, explain why (default to existing patterns).

**Major revision** (changed approach, different files) → loop back to Phase 3. Minor revisions proceed.

**Final output must include:**
- Summary of what will be built
- Files to create or modify
- Patterns being followed (with sources)
- Prior decisions referenced
- Risks and open questions
- What the review caught and changed

**The plan is complete. No codegen follows.**

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
