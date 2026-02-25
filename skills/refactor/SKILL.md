---
name: refactor
description: >
  Refactoring with implicit contract preservation, powered by Unblocked. Goes
  beyond code correctness to preserve the organizational contracts that live
  outside the code — team conventions, migration patterns, consumer expectations,
  and architectural direction. Scopes the refactor, hydrates context, plans with
  explicit contract preservation, reviews before and after execution. Use for any
  refactor where team context matters.
---

# Context-Aware Refactoring

Refactors are technically valid but organizationally wrong when they break implicit
contracts — conventions the team expects, patterns consumers depend on, migration
directions that aren't in the code. This skill hydrates the refactor with organizational
context so that what changes is intentional, and what's preserved is explicit.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. SCOPE          (Agent + Unblocked)                       │
│     │              Define what + why, query                  │
│     │              dependencies and consumers                │
│     ▼                                                        │
│  2. HYDRATE        (Unblocked)                               │
│     │              Conventions, prior refactors,             │
│     │              migration patterns, contracts             │
│     ▼                                                        │
│  3. PLAN           (Agent)                                   │
│     │              Explicit implicit-contract                │
│     │              preservation list                         │
│     ▼                                                        │
│  4. REVIEW PLAN    (Unblocked)                      ◄──┐     │
│     │              Validate against org context        │     │
│     ▼                                                  │     │
│  5. EXECUTE        (Agent)                             │     │
│     │              Implement the reviewed plan         │     │
│     │              [Major revision] ───────────────────┘     │
│     ▼                                                        │
│  6. VERIFY         (Unblocked + Agent)                       │
│     │              Review code against contracts             │
│     │              Run tests                                 │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Explicit about what's preserved.** Every refactor plan lists the implicit contracts it will preserve. If you can't name them, you haven't scoped it.
- **Conventions are contracts.** If the team names things a certain way, uses a certain pattern, or structures code in a certain way — that's a contract, even without documentation.
- **Refactor in the team's direction.** If the team is migrating from pattern A to pattern B, refactoring toward A is wrong even if A works.
- **Small, reviewable steps.** Large refactors should be broken into steps that can be reviewed and merged incrementally.
- **Tests are the safety net.** Run tests before and after. If tests don't exist, write them first.

---

## Phase 1: Scope (Agent + Unblocked)

Define what's being refactored and why, then understand the blast radius.

### Define the Refactor

- **What** is being refactored?
- **Why** is this refactor needed? (performance, readability, migration, tech debt)
- **What should change** and what should stay the same?

### Query Dependencies and Consumers

1. `unblocked_context_engine`: "What depends on [module/API/pattern being refactored]? Who are the consumers?"
2. `unblocked_context_engine`: "What systems or modules interact with [refactor target]?"
3. `data_retrieval`: recent PRs touching the target area — who else is working here?

**Capture:**
- Direct consumers of the code being refactored
- Indirect dependencies (systems that depend on the consumers)
- Active work in the area that could conflict
- Implicit contracts: naming, behavior, error handling, performance characteristics

---

## Phase 2: Hydrate (Unblocked)

Gather the organizational context needed to refactor without breaking implicit contracts.

**Required queries:**

1. `unblocked_context_engine`: "What conventions does the team follow for [area being refactored]?"
2. `historical_context`: "Has the team refactored [this area/pattern] before? What approach was used?"
3. `historical_context`: "What is the team's migration direction for [pattern/technology]? Are there migration guides?"
4. `unblocked_context_engine`: "What are the known constraints or gotchas in [area]?"
5. `unblocked_context_engine`: "What testing patterns does the team use for [area]?"

**Also query for migration patterns if applicable:**

6. `historical_context`: "What migration patterns has the team used for [type of refactor]?"

See `references/migration-patterns.md` for common patterns.

**Capture:**
- Team conventions for the area
- Prior refactors and their approach (follow the same pattern)
- Migration direction (refactor toward it, not away from it)
- Known constraints and gotchas
- Testing approach for the area

---

## Phase 3: Plan (Agent)

Create a refactor plan with an **explicit implicit-contract preservation list**.

### The Plan Must Include

1. **What changes:** Files, modules, patterns being modified
2. **What's preserved:** The implicit contracts being maintained
3. **Migration direction:** How this refactor aligns with team direction
4. **Steps:** Ordered, incremental steps that can each be reviewed
5. **Verification:** How to confirm each step preserves behavior

### Implicit Contract Preservation List

This is the key differentiator. For each implicit contract:

```
Contract: [what's expected]
Type: [naming | behavior | performance | API surface | error handling | convention]
Preserved by: [how the refactor maintains this contract]
```

**Example:**
```
Contract: All middleware functions accept (req, res, next) and call next() on success
Type: Convention
Preserved by: New middleware wrapper maintains the same signature; internal implementation changes only

Contract: Error responses use { error: string, code: number } format
Type: API surface
Preserved by: Error formatting extracted to shared utility but response shape unchanged

Contract: Database queries use the repository pattern via src/lib/db/
Type: Convention
Preserved by: Refactored queries still go through repository layer, not direct DB access
```

---

## Phase 4: Review Plan (Unblocked)

**CRITICAL GATE — Do not skip.**

Submit the plan for review before executing.

**Required queries:**

1. `unblocked_context_engine`: "We plan to refactor [X] by [approach]. Does this align with how the team has refactored similar things?"
2. `unblocked_context_engine`: "We're preserving these contracts: [list]. Are we missing any implicit contracts?"
3. `historical_context`: "Has this refactor approach been tried before? Any issues?"
4. `unblocked_context_engine`: "What could go wrong with this refactor? Are there hidden dependencies?"

**Look for:**
- Missing implicit contracts not in the preservation list
- Conflict with team migration direction
- Prior failed attempts at this refactor
- Hidden dependencies the plan doesn't account for

**If major issues are found, revise the plan and re-review.**

---

## Phase 5: Execute (Agent)

Implement the refactor following the reviewed plan.

**During execution:**

- Follow the plan steps in order
- After each step, verify the implicit contracts are still preserved
- Run tests frequently — don't wait until the end
- If something unexpected arises, re-query Unblocked rather than guessing
- If the approach needs to change significantly, loop back to Phase 4

**For large refactors:** Consider implementing in separate, mergeable increments rather than one large change.

---

## Phase 6: Verify (Unblocked + Agent)

Verify the refactor against the contract preservation list and organizational context.

### Run Tests

- All existing tests should pass (the refactor preserves behavior)
- If tests were added as part of the refactor, they should pass too

### Review Against Context

1. `unblocked_context_engine`: "Does the refactored [code] match team conventions for [area]?"
2. `unblocked_context_engine`: "Are there any patterns or conventions the refactored code should follow that it doesn't?"

### Verify Each Contract

Go through the preservation list and confirm each contract is maintained:
- [ ] [Contract 1]: Preserved? How?
- [ ] [Contract 2]: Preserved? How?
- [ ] ...

**Present a summary:**
- What was refactored
- What contracts were preserved (and how)
- What the plan review caught
- What the verification review caught
- Any remaining follow-ups

---

## Tool Selection

| Question | Tool |
|---|---|
| Dependencies and consumers | `unblocked_context_engine` |
| Team conventions | `unblocked_context_engine` |
| Prior refactors | `historical_context` |
| Migration direction | `historical_context` |
| Recent work in the area | `data_retrieval` |
| Specific PR/issue details | `link_resolver` |
| Build/test failures | `failure_debugging` |
