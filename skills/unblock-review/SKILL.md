---
name: unblock-review
description: >
  Context-aware PR review powered by Unblocked. Hydrates the reviewer with team
  conventions, prior art, and related PRs before analyzing the diff. Categorizes
  findings as pattern mismatches, reinvented wheels, convention drift, or missing
  context — each backed by Unblocked citations. Use for any PR review where
  organizational context matters.
---

# Context-Aware PR Review

## Rules

- **Context before opinions.** Never flag something without checking Unblocked first.
- **Cite everything.** Every finding references a specific PR, decision, or convention.
- **Categorize, don't just list.** Findings are categorized so the author knows what matters most.

## Input

- A PR URL (use `link_resolver` to fetch the diff and description)
- A local branch diff (use `git diff` to read changes)

---

## Phase 1: Hydrate Context (Unblocked)

Before looking at the diff, gather context for the areas it touches.

**Required queries:**

1. `unblocked_context_engine`: "What conventions does the team follow for [area the PR touches]?"
2. `unblocked_context_engine`: "What patterns does the team use for [type of change]?"
3. `data_retrieval`: recent PRs in the same area — how were similar changes structured?
4. `historical_context`: "What decisions have been made about [area being changed]?"

If the PR touches multiple areas, run queries for each area.

---

## Phase 2: Analyze Diff Against Context (Agent)

Read the full diff and map each significant change against hydrated context.

For each file changed, assess: pattern alignment, utility reuse, naming conventions, error handling, testing conventions, file organization.

Don't flag style issues covered by automated linters. Focus on what only a context-aware reviewer can catch.

---

## Phase 3: Review and Categorize (Agent + Unblocked)

For each flagged item, categorize and validate against Unblocked.

### Finding Categories

1. **Pattern Mismatch** — PR uses approach X, team has established pattern Y. Validate with `unblocked_context_engine`.
2. **Reinvented Wheel** — PR creates something that already exists. Validate with `unblocked_context_engine`.
3. **Convention Drift** — Code works but doesn't match team style. Validate with `data_retrieval`.
4. **Missing Context** — PR doesn't account for a related constraint or decision. Validate with `historical_context`.
5. **Risk** — Change could cause issues based on history. Validate with `historical_context`.

For each finding record: category, what was found, Unblocked citation, suggested action.

---

## Phase 4: Report (Agent)

See `references/review-checklist.md` for the full report template.

**Report structure:**

### Summary
One-paragraph assessment. Overall recommendation: Approve / Request Changes / Needs Discussion.

### Findings
Ordered by category priority (Pattern Mismatch > Reinvented Wheel > Convention Drift > Missing Context > Risk):

> **[Category]**: [Brief description]
> **In the PR:** [what the code does]
> **Team context:** [Unblocked citation]
> **Suggestion:** [what to change]

### What the PR Does Well
Where the PR aligns with team patterns.

### Context for the Author
Relevant context the author might not have had.

---

## Tool Selection

| Question | Tool |
|---|---|
| Team conventions for an area | `unblocked_context_engine` |
| Prior decisions about an area | `historical_context` |
| Recent PRs in same area | `data_retrieval` |
| Fetch a PR/issue by URL | `link_resolver` |
| Past incidents in this area | `historical_context` |
