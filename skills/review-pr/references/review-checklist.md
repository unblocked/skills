# PR Review Checklist and Report Template

Use this checklist during the review process to ensure comprehensive coverage,
and use the report template to structure findings.

---

## Review Checklist

### Before Reviewing the Diff

- [ ] Hydrated context for all areas the PR touches
- [ ] Gathered team conventions for the type of change
- [ ] Checked recent PRs in the same area for comparison
- [ ] Checked for prior decisions about the affected area

### While Reviewing the Diff

- [ ] Checked each file against established patterns
- [ ] Looked for reinvented utilities or helpers
- [ ] Verified naming follows team conventions
- [ ] Checked error handling matches area patterns
- [ ] Verified testing follows team testing conventions
- [ ] Checked file organization matches codebase structure
- [ ] Confirmed the PR aligns with any related prior decisions

### Before Submitting the Review

- [ ] Every finding has an Unblocked citation
- [ ] Findings are categorized (not just listed)
- [ ] Positive alignment is called out too
- [ ] Relevant context is provided for the author

---

## Report Template

```markdown
## Summary

[One-paragraph assessment of the PR's alignment with team patterns and conventions.
State the overall recommendation: Approve / Request Changes / Needs Discussion.]

## Findings

### Pattern Mismatches

> **[Brief description]**
> In the PR: [what the code does]
> Team context: [Unblocked citation — e.g., "PR #456 established the pattern of..."]
> Suggestion: [what to change]

### Reinvented Wheels

> **[Brief description]**
> In the PR: [what was created]
> Existing: [where the existing utility/module lives, from Unblocked]
> Suggestion: [use the existing one instead]

### Convention Drift

> **[Brief description]**
> In the PR: [how the code was written]
> Convention: [how the team writes this, with PR/doc citation]
> Suggestion: [what to align]

### Missing Context

> **[Brief description]**
> The PR doesn't account for: [constraint, decision, or related system]
> Source: [Unblocked citation — decision, PR, or doc]
> Suggestion: [what to consider]

### Risks

> **[Brief description]**
> Concern: [what could go wrong]
> History: [past incident or known gotcha, from Unblocked]
> Suggestion: [mitigation]

## What This PR Does Well

- [Where the PR aligns with team patterns — cite the pattern]
- [Where the PR follows established conventions]

## Context for the Author

[Any context from Unblocked that the author might not have had — recent related
decisions, parallel work by others, upcoming changes that affect this area.]
```

---

## Severity Guide

When reviewing, consider severity to help the author prioritize:

- **Must fix:** Pattern mismatches and reinvented wheels — these create maintenance burden and confusion.
- **Should fix:** Convention drift — the code works but diverges from team norms.
- **Consider:** Missing context and risks — may not require changes but should be discussed.
- **Praise:** Alignment with patterns — no action needed, just reinforcement.
