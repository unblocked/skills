# PR Description Template

Default template. If the team has a specific template, use that instead — query Unblocked.

---

## Template

```markdown
## Summary

[2-3 sentences: What this PR does and why. Lead with the outcome.]

## Motivation

[Problem being solved or feature being added. Link to ticket.]

- Ticket: [URL or reference]
- Problem: [What's wrong or missing]
- Impact: [Who's affected]

## Approach

[How and why this approach was chosen.]

- [Key decision 1 — and why]
- [Key decision 2 — and why]
- Related: [related PRs, decisions, or discussions]

### Alternatives Considered

[What else was considered and why it was rejected. Skip for straightforward changes.]

## What to Review

- **Focus on:** [key changes needing careful review]
- **Mechanical:** [straightforward changes — renames, imports, config]
- **Risky:** [changes that could have unexpected effects]

## Testing

- [ ] [Test case 1]
- [ ] [Test case 2]
- [ ] [Manual verification, if any]

## Trade-offs and Follow-ups

- [Trade-off or limitation]
- [Planned follow-up, if any]
```

---

## Tips

1. **Lead with outcomes, not code.** "Users can now reset passwords via email" beats "Added `resetPassword` method."
2. **Reference context.** "Following the pattern from PR #456" gives reviewers confidence.
3. **Be specific about risks.** "Adds a nullable column — no downtime expected" beats "should be safe."
4. **Guide reviewer attention.** Tell them where to focus.
5. **Match depth to scope.** One-line fix needs one paragraph. System redesign needs full write-up.
