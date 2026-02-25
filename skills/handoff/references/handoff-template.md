# Handoff Document Template

Use this template to structure the handoff document. Adapt sections as needed for
the specific session.

---

## Template

```markdown
# Handoff: [Task Description]

> Session: [date and time]
> Branch: [current branch name]
> Status: [% complete — e.g., "~60% complete"]

## Task

[What was the original task/goal? Link to ticket if available.]

## Approach

[What approach was chosen and why. Reference the plan if one was created.]

Key decisions:
- [Decision 1]: [rationale]
- [Decision 2]: [rationale]

## Progress

### Done
- [x] [Completed item — reference specific files]
- [x] [Completed item]

### In Progress
- [ ] [Partially done item — describe current state]

### Not Started
- [ ] [Remaining item]
- [ ] [Remaining item]

## Key Context (from Unblocked)

[Context that took time to gather and shouldn't be re-queried. Be specific.]

- **Team convention:** [what was learned — e.g., "team uses repository pattern for DB access, see src/lib/db/"]
- **Prior decision:** [what was learned — e.g., "team rejected Redis caching in PR #456 due to ops complexity"]
- **Related system:** [what was learned — e.g., "notification service depends on this API, changes need coordination"]

## Files Changed

| File | Status | Notes |
|------|--------|-------|
| `[path]` | Modified / Created / Planned | [what was done or needs to be done] |

## What Didn't Work

[Approaches that were tried and failed — so the next session doesn't repeat them.]

- **[Approach]:** [why it didn't work]

## Open Questions

[Questions that need human input or further investigation.]

- [ ] [Question — who might know the answer?]

## Next Steps

[Prioritized list of what the next session should do first.]

1. [First thing — most important or blocking]
2. [Second thing]
3. [Third thing]

## How to Continue

[Practical steps for the next session to pick up where this left off.]

1. Check out branch: `[branch name]`
2. [Any setup needed]
3. Start with: [first next step from above]
```

---

## Tips for Good Handoffs

1. **Lead with next steps.** The next session wants to know what to do, not read a history.

2. **Be specific about files.** `src/auth/middleware.ts:45-60` beats "the auth middleware."

3. **Include the why.** "We chose JWT over sessions because the team decided in PR #234 to go stateless" prevents the next session from re-debating the decision.

4. **Flag what's fragile.** If something is half-done and could break, say so explicitly.

5. **Include failed approaches.** "Tried using the existing `rateLimit` utility but it doesn't support per-user limits (only global)" saves the next session from the same dead end.
