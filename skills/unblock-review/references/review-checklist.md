# PR Review Checklist and Report Template

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
- [ ] Verified testing follows team conventions
- [ ] Confirmed alignment with related prior decisions

### Before Submitting

- [ ] Every finding has an Unblocked citation
- [ ] Findings are categorized (not just listed)
- [ ] Positive alignment is called out too

---

## Report Template

```markdown
## Summary

[One-paragraph assessment. Recommendation: Approve / Request Changes / Needs Discussion.]

## Findings

### Pattern Mismatches

> **[Brief description]**
> In the PR: [what the code does]
> Team context: [Unblocked citation]
> Suggestion: [what to change]

### Reinvented Wheels

> **[Brief description]**
> In the PR: [what was created]
> Existing: [where the existing utility lives]
> Suggestion: [use the existing one]

### Convention Drift

> **[Brief description]**
> In the PR: [how the code was written]
> Convention: [how the team writes this, with citation]
> Suggestion: [what to align]

### Missing Context

> **[Brief description]**
> The PR doesn't account for: [constraint, decision, or related system]
> Source: [Unblocked citation]
> Suggestion: [what to consider]

### Risks

> **[Brief description]**
> Concern: [what could go wrong]
> History: [past incident or known gotcha]
> Suggestion: [mitigation]

## What This PR Does Well

- [Alignment with team patterns — cite the pattern]

## Context for the Author

[Context the author might not have had — recent decisions, parallel work, upcoming changes.]
```
