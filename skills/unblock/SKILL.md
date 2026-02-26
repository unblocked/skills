---
name: unblock
description: >
  Structures coding tasks around Unblocked MCP context. Hydrates a plan with
  organizational knowledge (PRs, Slack, Jira, docs, code history), submits it
  for critical review against team patterns, then generates and reviews code.
  Two mandatory review gates prevent pattern mismatches and reinvented wheels.
  Use for any code change: features, bug fixes, refactors, or investigations.
---

# Unblocked Dev Workflow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. HYDRATE        (Unblocked)                               │
│     │              Query context from connected data         |
|     |              sources like PRs, Slack,                  │
│     │              Jira, docs, code history                  │
│     ▼                                                        │
│  2. DRAFT PLAN     (Agent)                                   │
│     │              Design implementation using               │
│     │              hydrated context                          │
│     ▼                                                        │
│  3. REVIEW PLAN    (Unblocked)                      ◄──┐     │
│     │              Critically evaluate the plan        │     │
│     │              against org knowledge               │     │
│     ▼                                                  │     │
│  4. REVISE PLAN    (Agent)                             │     │
│     │              Incorporate feedback                │     │
│     │              [Major issues] ─────────────────────┘     │
│     │              [Minor/none]                              │
│     ▼                                                        │
│  5. GENERATE CODE  (Agent)                                   │
│     │              Implement the validated plan              │
│     ▼                                                        │
│  6. REVIEW CODE    (Unblocked)                      ◄──┐     │
│     │              Verify generated code against       │     │
│     │              context, patterns, conventions      │     │
│     ▼                                                  │     │
│  7. REVISE CODE    (Agent)                             │     │
│     │              Fix issues found in review          │     │
│     │              [Issues found] ─────────────────────┘     │
│     │              [Pass]                                    │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Labels: **(Unblocked)** = query Unblocked MCP tools; **(Agent)** = the AI coding agent. Both review gates (3 and 6) are mandatory.

## Principles

- **Multiple specific queries > one broad query.** Ask 3-4 focused questions, not one vague one.
- **Plans must be specific enough to review.** Name files, reference patterns, cite decisions.
- **Default to existing patterns.** Follow what Unblocked shows the team does, even if you think another way is "better."
- **Loop back, don't patch forward.** If review finds issues, fix them properly — don't compensate in the next phase.

## Scaling to Task Size

- **Trivial** (typo, one-line config): Skip to Phase 5, but always run Phase 6.
- **Small** (helper, single-file logic): Light Phases 1-2 (one or two queries), then full workflow.
- **Standard** (feature, bug fix, refactor): Full workflow as written.
- **Large** (cross-cutting refactor, new subsystem): Full workflow, expect multiple review loops, consider splitting.

When in doubt, run the full workflow. An unnecessary query costs seconds; missing context costs a rewrite.

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

Submit the plan for critical review before writing code.

1. `unblocked_context_engine`: "We plan to [approach]. Does this align with how [related system] works? Existing patterns we should follow instead?"
2. `unblocked_context_engine`: "We plan to modify/create [files]. What do we need to know about these files and their dependencies?"
3. `historical_context`: "Has the team tried [planned approach] before? Problems or rejected alternatives?"
4. `unblocked_context_engine`: "What could go wrong with [approach]? Edge cases, performance, integration issues?"

**Look for:** pattern mismatches, missing context, rejected approaches, naming/convention violations, scope blindness.

State what the review found, whether the plan needs revision, and what changes are needed.

---

## Phase 4: Revise Plan (Agent)

Incorporate all feedback. For each finding: state what was found, how the plan is updating, and if you disagree, explain why (default to existing patterns).

**Major revision** (changed approach, different files) → loop back to Phase 3. Minor revisions (naming, missing import) proceed.

Present the final plan to the user before codegen.

---

## Phase 5: Generate Code (Agent)

Implement the validated plan. Follow it — don't deviate without reason. If something unexpected contradicts the plan, re-query Unblocked. On build/runtime errors, use `failure_debugging` with the error message.

---

## Phase 6: Review Code (Unblocked)

**CRITICAL GATE — Do not skip.**

Verify generated code against organizational context.

1. `unblocked_context_engine`: "We wrote [summary of changes]. Does this match how the team implements [this kind of thing]?"
2. `unblocked_context_engine`: "Is [specific pattern in code] consistent with conventions in [area]? Existing utilities we should use instead?"
3. `unblocked_context_engine`: "What are testing conventions for [area changed]? Do our changes follow them?"
4. `historical_context`: "Have there been issues with [approach taken] in this area?"

**Look for:** reinvented wheels, convention drift, missing patterns, context gaps.

State what the review found, whether code needs revision, and what changes are needed.

---

## Phase 7: Revise Code (Agent)

Fix all issues from review. For each: state what was found, what is changing, and make the fix.

**Significant revision** (new files, changed approach) → loop back to Phase 6. Small fixes proceed.

**Final summary:** what was built, what plan review caught, what code review caught, remaining considerations.

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
