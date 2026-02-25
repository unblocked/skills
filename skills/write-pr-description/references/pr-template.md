# PR Description Template

Default template for PR descriptions. If the team has a specific template or convention,
use that instead — query Unblocked to find it.

---

## Template

```markdown
## Summary

[2-3 sentences: What this PR does and why. Lead with the outcome, not the implementation.]

## Motivation

[The problem being solved or feature being added. Link to the ticket/issue.]

- Ticket: [URL or reference]
- Problem: [What's wrong or missing]
- Impact: [Who's affected and how]

## Approach

[How the change was implemented and why this approach was chosen.]

- [Key implementation decision 1 — and why]
- [Key implementation decision 2 — and why]
- Related: [Link to related PRs, decisions, or discussions]

### Alternatives Considered

[What other approaches were considered and why they were rejected.
Skip this section for straightforward changes.]

## What to Review

[Guide the reviewer — what's important, what's mechanical.]

- **Focus on:** [The key changes that need careful review]
- **Mechanical:** [Changes that are straightforward — renames, imports, config]
- **Risky:** [Any changes that could have unexpected effects]

## Testing

[How the change was tested.]

- [ ] [Test case 1]
- [ ] [Test case 2]
- [ ] [Manual verification steps, if any]

## Trade-offs and Follow-ups

[Any downsides, deferred work, or known limitations.]

- [Trade-off or limitation]
- [Planned follow-up work, if any]
```

---

## Tips for Good PR Descriptions

1. **Lead with outcomes, not code.** "Users can now reset passwords via email" beats "Added `resetPassword` method to `AuthService`."

2. **Reference context.** "Following the pattern from PR #456" or "Per the decision in the #backend Slack thread on Jan 15" gives reviewers confidence.

3. **Be specific about risks.** "The migration is backward-compatible but adds a nullable column — no downtime expected" is more useful than "should be safe."

4. **Guide reviewer attention.** Reviewers are more effective when they know where to focus. Don't make them figure it out from the diff.

5. **Keep it proportional.** A one-line bug fix needs a one-paragraph description. A system redesign needs a full write-up. Match the description depth to the change scope.
