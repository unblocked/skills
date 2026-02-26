# Handoff Document Template

---

## Template

```markdown
# Handoff: [Task Description]

> Session: [date and time]
> Branch: [current branch name]
> Status: [% complete]

## Task

[Original task/goal. Link to ticket if available.]

## Approach

[Approach chosen and why. Reference the plan if one was created.]

Key decisions:
- [Decision 1]: [rationale]
- [Decision 2]: [rationale]

## Progress

### Done
- [x] [Completed item — reference specific files]

### In Progress
- [ ] [Partially done — describe current state]

### Not Started
- [ ] [Remaining item]

## Key Context (from Unblocked)

[Context that took time to gather — don't re-query.]

- **Team convention:** [what was learned]
- **Prior decision:** [what was learned]
- **Related system:** [what was learned]

## Files Changed

| File | Status | Notes |
|------|--------|-------|
| `[path]` | Modified / Created / Planned | [what was done or needs doing] |

## What Didn't Work

- **[Approach]:** [why it failed]

## Open Questions

- [ ] [Question — who might know?]

## Next Steps

1. [First — most important or blocking]
2. [Second]
3. [Third]

## How to Continue

1. Check out branch: `[branch name]`
2. [Any setup needed]
3. Start with: [first next step]
```

---

## Tips

1. **Lead with next steps.** The next session wants to know what to do first.
2. **Be specific about files.** `src/auth/middleware.ts:45-60` beats "the auth middleware."
3. **Include the why.** Prevent re-debating decisions.
4. **Flag what's fragile.** If something is half-done, say so.
5. **Include failed approaches.** Save the next session from dead ends.
