---
name: unblock-review
description: >
  Code review with org context — checks diffs and PRs against team conventions,
  patterns, and prior decisions using Unblocked. Categorizes findings by severity.
  Does not generate or fix code.
---

# Unblocked Code Review

Reviews code changes against organizational context. Does not generate or fix code.

## Rules

- **Stay focused on the diff.** Review what changed, not the entire file.
- **Every finding must be actionable.** State what's wrong, why, and what to do instead.
- **Categorize findings:** Must Fix (blocks merge) / Should Fix (improves quality) / Consider (optional improvement).

---

## Phase 1: Identify Changes

Parse the diff to understand what changed:

- **Input:** git diff, PR URL (via `link_resolver`), or pasted description. Detect what's available.
- **Extract:** files changed, nature of changes (new code, refactor, fix), areas of codebase affected, apparent intent.
- **Group** changes by area for targeted context queries.

---

## Phase 2: Hydrate Context (Unblocked)

Gather org context for each area touched by the diff.

**Per area:**
1. `unblocked_context_engine`: "What conventions does the team follow for [area]?"
2. `unblocked_context_engine`: "What patterns are used for [type of change] in this codebase?"
3. `historical_context`: "What decisions were made about [area]? Any rejected approaches?"
4. `data_retrieval`: recent PRs in the same area — what do reviewers typically flag?

**Per observed pattern in the diff:**
5. `unblocked_context_engine`: "Is there an existing utility or standard approach for [what the code does]?"

---

## Phase 3: Review

Check the diff against gathered context:

- **Reinvented wheels:** code creates something that already exists as a utility or shared module
- **Convention drift:** code works but doesn't match team style — error handling, naming, file organization
- **Missing patterns:** team has established patterns for this kind of change (migrations, API docs, events) that the code doesn't follow
- **Naming violations:** inconsistent with codebase conventions
- **Error handling:** doesn't follow team patterns
- **Testing gaps:** missing tests or wrong testing approach for this area
- **Scope completeness:** related files or systems that should change together

Run targeted queries referencing actual code from the diff to verify findings.

---

## Output

**Structured review report:**

1. **Summary** — one paragraph: what was changed, overall assessment
2. **Must Fix** — blocks merge. Each item: finding, source/evidence from Unblocked, what to do instead
3. **Should Fix** — improves quality. Same format.
4. **Consider** — optional improvements.
5. **Looks Good** — what the changes got right (especially pattern alignment)
6. **Key Context** — important org context gathered that the author should know

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
