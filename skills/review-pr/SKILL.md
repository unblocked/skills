---
name: review-pr
description: >
  Context-aware PR review powered by Unblocked. Hydrates the reviewer with team
  conventions, prior art, and related PRs before analyzing the diff. Categorizes
  findings as pattern mismatches, reinvented wheels, convention drift, or missing
  context — each backed by Unblocked citations. Use for any PR review where
  organizational context matters.
---

# Context-Aware PR Review

Reviews a pull request against organizational context — not just code correctness, but
alignment with team patterns, conventions, and prior decisions. Every finding is backed
by a citation from Unblocked (a prior PR, a Slack decision, a convention document).

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. HYDRATE        (Unblocked)                               │
│     │              Gather conventions, prior art,            │
│     │              related PRs, team patterns                │
│     ▼                                                        │
│  2. ANALYZE        (Agent)                                   │
│     │              Map diff against hydrated context         │
│     │              Identify deviations and gaps              │
│     ▼                                                        │
│  3. REVIEW         (Agent + Unblocked)                       │
│     │              Categorize each finding                   │
│     │              Validate against Unblocked context        │
│     ▼                                                        │
│  4. REPORT         (Agent)                                   │
│     │              Structured findings with citations        │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Context before opinions.** Never flag something without checking Unblocked first. The team may have a good reason for it.
- **Cite everything.** Every finding references a specific PR, decision, convention, or prior art from Unblocked.
- **Categorize, don't just list.** Findings are categorized so the author knows what matters most.
- **Praise alignment too.** When the PR follows team patterns well, call it out — reinforces good practice.
- **Review the change, not the person.** Findings are about the code and its alignment with team context.

## Input

The reviewer needs either:
- A PR URL (use `link_resolver` to fetch the diff and description)
- A local branch diff (use `git diff` to read changes)

If a PR URL is provided, resolve it first to get the full diff and description.

---

## Phase 1: Hydrate Context (Unblocked)

Before looking at the diff, gather the context needed to review it meaningfully.

**Required queries:**

1. `unblocked_context_engine`: "What conventions does the team follow for [area the PR touches]?"
2. `unblocked_context_engine`: "What patterns does the team use for [type of change — API, UI, data layer, etc.]?"
3. `data_retrieval`: recent PRs in the same area — how were similar changes structured?
4. `historical_context`: "What decisions have been made about [area being changed]?"

**If the PR touches multiple areas, run queries for each area.**

**Collect and carry forward:**
- Team conventions for the affected area
- Established patterns for this type of change
- Recent PRs that touched the same files (for comparison)
- Prior decisions and constraints
- Known utilities, helpers, and shared modules in the area

---

## Phase 2: Analyze Diff Against Context (Agent)

Read the full diff and map each significant change against the hydrated context.

**For each file changed, assess:**

- Does the approach match established patterns?
- Does it use existing utilities or reinvent something?
- Does naming follow team conventions?
- Does error handling match the area's patterns?
- Does testing follow team testing conventions?
- Does file organization match the codebase structure?

**Flag anything that doesn't align with the gathered context.**

Don't flag style issues that are covered by automated linters. Focus on what only
a context-aware reviewer can catch.

---

## Phase 3: Review and Categorize (Agent + Unblocked)

For each flagged item from Phase 2, categorize it and validate against Unblocked.

### Finding Categories

1. **Pattern Mismatch** — The PR uses approach X, but the team has an established pattern Y.
   - Validate: `unblocked_context_engine` — confirm the team pattern exists and is current.

2. **Reinvented Wheel** — The PR creates something that already exists as a utility or shared module.
   - Validate: `unblocked_context_engine` — confirm the existing utility and where it lives.

3. **Convention Drift** — The code works but doesn't match how the team writes this kind of code.
   - Validate: `data_retrieval` — find recent PRs that demonstrate the convention.

4. **Missing Context** — The PR doesn't account for a related system, constraint, or decision.
   - Validate: `historical_context` — confirm the decision or constraint exists.

5. **Risk** — The change could cause issues based on historical patterns.
   - Validate: `historical_context` — find past incidents or known gotchas.

**For each finding, record:**
- Category (from above)
- What was found in the diff
- What Unblocked showed (the citation)
- Suggested action

---

## Phase 4: Report (Agent)

Present the review as a structured report. See `references/review-checklist.md` for
the full report template.

**Report structure:**

### Summary
- One-paragraph assessment: Does this PR align with team patterns?
- Overall recommendation: Approve / Request Changes / Needs Discussion

### Findings
For each finding (ordered by category priority: Pattern Mismatch > Reinvented Wheel > Convention Drift > Missing Context > Risk):

> **[Category]**: [Brief description]
>
> **In the PR:** [What the code does]
> **Team context:** [What Unblocked showed — cite the PR, decision, or convention]
> **Suggestion:** [What to change]

### What the PR Does Well
Call out where the PR aligns with team patterns — reinforces good practice.

### Context for the Author
Any relevant context the author might not have had when writing the PR.

---

## Tool Selection

| Question | Tool |
|---|---|
| Team conventions for an area | `unblocked_context_engine` |
| Prior decisions about an area | `historical_context` |
| Recent PRs in same area | `data_retrieval` |
| Fetch a PR/issue by URL | `link_resolver` |
| Past incidents in this area | `historical_context` |
