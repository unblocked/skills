# Agent Team Templates

Pre-configured team structures. Select based on task complexity and parallelism.

---

## Small Team (2 Agents)

**Roles:** Planner + Implementer

```
Planner ──[reviewed plan]──► Implementer ──► Done
```

**When:** Single implementation thread, no natural parallelism. Review via implementer's self-review (Phase 6 of `unblock`).

**Planner:** `agents/unblocked-planner.md` — runs Phases 1-4, outputs reviewed plan.
**Implementer:** `unblock` skill — runs Phases 5-7 from the reviewed plan.

---

## Medium Team (3 Agents)

**Roles:** Planner + Implementer + Reviewer

```
Planner ──[reviewed plan]──► Implementer ──[code]──► Reviewer ──► Done
```

**When:** Standard feature work. Review independence matters — reviewer isn't biased by implementation reasoning.

**Planner:** `agents/unblocked-planner.md` — Phases 1-4, outputs reviewed plan.
**Implementer:** Code generation following the plan. Skips self-review.
**Reviewer:** `agents/unblocked-reviewer.md` — full context-aware review of the diff.

---

## Large Team (4+ Agents)

**Roles:** Planner + Parallel Implementers + Reviewer

```
                    ┌──► Implementer A ──┐
Planner ──[plans]──►├──► Implementer B ──├──► Reviewer ──► Done
                    └──► Implementer C ──┘
```

**When:** Task decomposes into truly independent units with natural parallelism.

**Planner:** One plan per unit, defines dependencies and integration order.
**Implementers:** One per independent unit, parallel on non-overlapping files.
**Reviewer:** Reviews all units together for cross-unit consistency.

### Parallelism Rules

- **Independent units:** Run in parallel (different files, different systems)
- **Interface-dependent:** Interface defined in plan, then parallel implementation
- **Data-dependent:** Must serialize (migration before API uses new schema)

---

## Choosing a Team Size

| Factor | Small (2) | Medium (3) | Large (4+) |
|--------|-----------|------------|------------|
| Task complexity | Moderate | High | Very high |
| Parallelism | None | None | High |
| Review independence | No | Yes | Yes |
| Systems touched | 1 | 1-2 | 3+ |
| Typical task | Refactor, bug fix | Feature | Multi-system feature |

**When in doubt, start with Medium (3).** Plan/implement/review separation without parallel coordination complexity.
