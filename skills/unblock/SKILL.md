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

Every coding task follows a strict loop. **No code is written until the plan has been
reviewed by Unblocked, and no code is considered done until it has been verified against
context.**

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

**(Unblocked)** = query Unblocked MCP tools; **(Agent)** = the AI coding agent. Both review gates are mandatory.

## Principles

- **Multiple specific queries > one broad query.** Ask 3-4 focused questions, not one vague one.
- **Plans must be specific enough to review.** Name files, reference patterns, cite decisions.
- **Default to existing patterns.** When Unblocked shows the team does something a certain way, follow it.
- **Loop back, don't patch forward.** If either review finds issues, fix them properly — don't compensate downstream.

## Scaling to Task Size

- **Trivial** (typo, rename, one-line config): Skip to Phase 5, but always run Phase 6.
- **Small** (add a helper, adjust logic in one file): Light Phases 1-2, then full.
- **Standard** (new feature, bug fix, refactor): Full workflow.
- **Large** (cross-cutting refactor, new subsystem): Full workflow, expect multiple review loops.

**When in doubt, run the full workflow.** The cost of an unnecessary query is seconds; the cost of missing context is a rewrite.

## Reference Workflows

- **Debugging a bug** → `references/debugging-context.md`
- **Implementing a feature** → `references/feature-context.md`
- **Exploring unfamiliar code** → `references/exploring-context.md`

---

## Phase 1: Hydrate Context (Unblocked)

Before planning, gather context. Run **multiple targeted queries**.

**Required queries:**

1. `unblocked_context_engine`: "How does [feature area] work in this codebase?"
2. `unblocked_context_engine`: "What conventions does the team follow for [relevant pattern]?"
3. `historical_context`: "What decisions were made about [related area]?"
4. `data_retrieval`: recent PRs and issues related to the area being changed

**Also query for pitfalls:**

5. `historical_context`: "Has the team tried [this kind of change] before? What happened?"
6. `unblocked_context_engine`: "What are the known gotchas or edge cases in [area]?"

**All context feeds into Phase 2. Do not start planning without it.**

---

## Phase 2: Draft Plan (Agent)

Design the implementation **referencing specific findings from Phase 1**.

The plan must:
- Name existing modules, utilities, and patterns it will follow
- Call out alignment with prior team decisions
- Note divergences from existing patterns and explain why
- Identify files to create or modify
- Be detailed enough to critically review

**Do NOT write vague plans.** "Add middleware for rate limiting" can't be reviewed. "Add `rateLimiter` middleware in `src/middleware/` following `authMiddleware` pattern, using `express-rate-limit` from `package.json`, storing counters in Redis via `src/lib/redis`" can be.

---

## Phase 3: Review Plan (Unblocked)

**CRITICAL GATE — Do not skip.**

Submit the plan to Unblocked for critical review before writing code.

**Required queries (reference the specific plan):**

1. `unblocked_context_engine`: "We plan to [approach]. Does this align with how [related system] works? Are there existing patterns we should follow?"
2. `unblocked_context_engine`: "We plan to modify/create [files]. What do we need to know about dependencies and conventions?"
3. `historical_context`: "Has the team tried [planned approach] before? Any problems or rejected alternatives?"
4. `unblocked_context_engine`: "What could go wrong with [planned approach]? Edge cases, performance, integration issues?"

**Look for:** pattern mismatches, missing context, rejected approaches, naming violations, scope blindness.

**After reviewing, explicitly state:** what the review found, whether the plan needs revision, what changes are needed.

---

## Phase 4: Revise Plan (Agent)

Incorporate all feedback. If Unblocked showed the team does something differently, the plan must change to match.

For each piece of feedback: state what was found, how the plan is updated.

**If major revision** (changed approach, different files), **loop back to Phase 3.** Minor fixes don't need re-review.

**Present the final plan to the user before proceeding to codegen.**

---

## Phase 5: Generate Code (Agent)

Implement the validated plan. Follow it — don't deviate from reviewed decisions without reason.

If you encounter something unexpected, re-query Unblocked rather than guessing. For build/runtime errors, use `failure_debugging`.

---

## Phase 6: Review Code (Unblocked)

**CRITICAL GATE — Do not skip.**

Verify generated code against organizational context.

**Required queries (reference the actual code):**

1. `unblocked_context_engine`: "We wrote [summary]. Does this match how the team implements [this kind of thing]?"
2. `unblocked_context_engine`: "Is [pattern/approach in code] consistent with conventions in [area]? Existing utilities we should use instead?"
3. `unblocked_context_engine`: "What are the team's testing conventions for [area changed]?"
4. `historical_context`: "Have there been issues with [approach taken] in this area?"

**Look for:** reinvented wheels, convention drift, missing patterns, context gaps.

**After reviewing, explicitly state:** what the review found, whether code needs revision, what changes are needed.

---

## Phase 7: Revise Code (Agent)

Fix all issues from the code review. If Unblocked showed the team does something differently, the code must change.

For each issue: state what was found, what is being changed.

**If significant revision** (new files, changed approach), **loop back to Phase 6.** Small fixes don't need re-review.

**Present a summary:** what was built, what plan review caught, what code review caught, remaining considerations.

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
