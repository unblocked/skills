---
name: unblock-refactor
description: >
  Refactoring with implicit contract preservation, powered by Unblocked. Goes
  beyond code correctness to preserve the organizational contracts that live
  outside the code — team conventions, migration patterns, consumer expectations,
  and architectural direction. Use for any refactor where team context matters.
---

# Context-Aware Refactoring

## Rules

- **Explicit about what's preserved.** Every plan lists implicit contracts it will preserve. If you can't name them, you haven't scoped it.
- **Conventions are contracts.** If the team names things a certain way or uses a certain pattern, that's a contract.
- **Refactor in the team's direction.** If migrating from A to B, refactoring toward A is wrong even if A works.

---

## Phase 1: Scope (Agent + Unblocked)

Define what's being refactored and why, then understand blast radius.

- **What** is being refactored?
- **Why** — performance, readability, migration, tech debt?
- **What should change** and what should stay the same?

### Query Dependencies

1. `unblocked_context_engine`: "What depends on [module/API/pattern being refactored]?"
2. `unblocked_context_engine`: "What systems interact with [refactor target]?"
3. `data_retrieval`: recent PRs touching the target area

---

## Phase 2: Hydrate (Unblocked)

1. `unblocked_context_engine`: "What conventions does the team follow for [area]?"
2. `historical_context`: "Has the team refactored [this area] before? What approach?"
3. `historical_context`: "What is the team's migration direction for [pattern/technology]?"
4. `unblocked_context_engine`: "Known constraints or gotchas in [area]?"
5. `unblocked_context_engine`: "Testing patterns for [area]?"

See `references/migration-patterns.md` for common patterns.

---

## Phase 3: Plan (Agent)

Create a refactor plan with an **explicit implicit-contract preservation list**.

### The Plan Must Include

1. **What changes:** files, modules, patterns
2. **What's preserved:** the implicit contracts being maintained
3. **Migration direction:** alignment with team direction
4. **Steps:** ordered, incremental, reviewable
5. **Verification:** how to confirm each step preserves behavior

### Implicit Contract Preservation List

For each contract:
```
Contract: [what's expected]
Type: [naming | behavior | performance | API surface | error handling | convention]
Preserved by: [how the refactor maintains this]
```

---

## Phase 4: Review Plan (Unblocked)

**CRITICAL GATE — Do not skip.**

1. `unblocked_context_engine`: "Does this refactor align with how the team has refactored similar things?"
2. `unblocked_context_engine`: "We're preserving these contracts: [list]. Are we missing any?"
3. `historical_context`: "Has this refactor approach been tried before? Any issues?"
4. `unblocked_context_engine`: "What could go wrong? Hidden dependencies?"

Look for: missing contracts, conflict with migration direction, prior failures, hidden dependencies.

**If major issues, revise and re-review.**

---

## Phase 5: Execute (Agent)

Follow the plan steps in order. After each step, verify contracts are preserved. Run tests frequently. If approach needs significant change, loop back to Phase 4.

For large refactors: implement in separate, mergeable increments.

---

## Phase 6: Verify (Unblocked + Agent)

### Run Tests

All existing tests should pass. New tests too.

### Review Against Context

1. `unblocked_context_engine`: "Does the refactored code match team conventions?"
2. `unblocked_context_engine`: "Any patterns the refactored code should follow that it doesn't?"

### Verify Each Contract

Go through the preservation list and confirm each is maintained.

**Present summary:** what was refactored, contracts preserved, what reviews caught, remaining follow-ups.

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
