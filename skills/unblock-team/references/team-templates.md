# Agent Team Templates

Pre-configured team structures for multi-agent orchestration. Select based on task
complexity and parallelism potential.

---

## Small Team (2 Agents)

**Roles:** Planner + Implementer

```
Planner ──[reviewed plan]──► Implementer ──► Done
```

### When to Use
- Task needs careful planning but has a single implementation thread
- No natural parallelism in the implementation
- Review can be handled by the implementer's self-review (via `unblock` skill Phase 6)

### Configuration

**Planner Agent:**
- Uses: `agents/unblocked-planner.md`
- Runs: Phases 1-4 of the `unblock` workflow
- Output: Reviewed plan document

**Implementer Agent:**
- Uses: `unblock` skill (standard workflow)
- Input: Reviewed plan from planner
- Runs: Phases 5-7 (Generate, Review, Revise)
- The plan review (Phases 3-4) was already done by the planner

### Example: Refactoring Authentication Middleware

1. **Planner** hydrates context about auth middleware, conventions, consumers; drafts and reviews a refactoring plan
2. **Implementer** executes the reviewed plan, runs code review against Unblocked

---

## Medium Team (3 Agents)

**Roles:** Planner + Implementer + Reviewer

```
Planner ──[reviewed plan]──► Implementer ──[code]──► Reviewer ──► Done
```

### When to Use
- Standard feature work or complex changes
- Review independence is valuable (reviewer shouldn't be biased by implementation reasoning)
- Single implementation thread

### Configuration

**Planner Agent:**
- Uses: `agents/unblocked-planner.md`
- Runs: Phases 1-4 of the `unblock` workflow
- Output: Reviewed plan document

**Implementer Agent:**
- Runs: Code generation following the plan
- Skips self-review (the reviewer agent handles review)
- Flags any deviations from the plan

**Reviewer Agent:**
- Uses: `agents/unblocked-reviewer.md`
- Input: The diff produced by the implementer
- Runs: Full context-aware review against Unblocked
- Output: Structured review report

### Example: Adding Rate Limiting to API

1. **Planner** gathers context about API middleware, rate limiting patterns, prior attempts; produces a reviewed plan
2. **Implementer** adds rate limiting middleware following the plan
3. **Reviewer** independently reviews the implementation against team patterns

---

## Large Team (4+ Agents)

**Roles:** Planner + Parallel Implementers + Reviewer

```
                    ┌──► Implementer A ──┐
Planner ──[plans]──►├──► Implementer B ──├──► Reviewer ──► Done
                    └──► Implementer C ──┘
```

### When to Use
- Task decomposes into truly independent implementation units
- Parallel implementation would save significant time
- Units touch different files/systems with minimal overlap

### Configuration

**Planner Agent:**
- Uses: `agents/unblocked-planner.md`
- Produces: One plan per implementation unit
- Defines: Dependencies between units, integration order

**Implementer Agents (parallel):**
- One agent per independent unit
- Each receives its unit's plan
- Work in parallel on non-overlapping files
- Flag any unexpected dependencies

**Reviewer Agent:**
- Uses: `agents/unblocked-reviewer.md`
- Reviews **all units together** for cross-unit consistency
- Checks integration boundaries between units

### Example: Adding Notification Preferences (API + UI + Migration)

1. **Planner** decomposes into 3 units: API endpoint, UI preferences page, DB migration; produces 3 reviewed plans
2. **Implementer A** builds the API endpoint
3. **Implementer B** builds the UI preferences page
4. **Implementer C** creates the DB migration
5. **Reviewer** reviews all 3 units together for consistency

### Parallelism Rules

- **Truly independent units:** Can run in parallel (different files, different systems)
- **Interface-dependent units:** The interface must be defined in the plan before parallel implementation (e.g., API contract defined, then API and UI implement in parallel)
- **Data-dependent units:** Must serialize (e.g., migration must complete before API uses new schema)

---

## Choosing a Team Size

| Factor | Small (2) | Medium (3) | Large (4+) |
|--------|-----------|------------|------------|
| Task complexity | Moderate | High | Very high |
| Parallelism potential | None | None | High |
| Review independence needed | No | Yes | Yes |
| Number of systems touched | 1 | 1-2 | 3+ |
| Typical task | Refactor, bug fix | Feature, complex fix | Multi-system feature |

**When in doubt, start with Medium (3).** It gives you plan/implement/review separation
without the complexity of parallel coordination.
