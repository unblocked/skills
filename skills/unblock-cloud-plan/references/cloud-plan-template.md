# Cloud Plan Template

Self-contained plan for headless/cloud agents. Everything embedded — no external tools needed.

---

## Template

```markdown
# Cloud Plan: [Task Description]

> Generated: [date]
> Repo: [repository]
> Branch: [target branch]
> For: Headless agent execution (no MCP access)

## Task

[What to implement. Include acceptance criteria.]

## Codebase Context

### Architecture
[What the agent needs to know about the system.]

### Key Files
| File | Purpose | Relevance |
|------|---------|-----------|
| `[path]` | [what it does] | [why the agent needs it] |

### Existing Patterns

#### [Pattern Name]
```[language]
// From [file path]
[actual code example]
```
[When and how this pattern is used.]

### Related PRs and Decisions

| PR/Decision | Summary | Relevance |
|-------------|---------|-----------|
| PR #[N] "[title]" | [what it did] | [why it matters] |

## Conventions

- **Naming:** [file, function, variable conventions]
- **Error handling:** [pattern with example]
- **Testing:** [approach, organization, assertion style]
- **File organization:** [where new files go]
- **Imports:** [ordering, absolute vs. relative]

## Implementation Steps

### Step 1: [Action]
- **Files:** `[path]`
- **Do:** [specific instruction]
- **Pattern:** [reference pattern above]
- **Verify:** [how to check]

### Step 2: [Action]
- **Files:** `[path]`
- **Do:** [specific instruction]
- **Verify:** [how to check]

## Constraints

- DO NOT [constraint 1]
- DO NOT [constraint 2]
- DO NOT [constraint 3]

## Verification

1. [ ] [Verification step]
2. [ ] [Verification step]
3. [ ] [Verification step]
```

---

## Tips

1. **Paste code, don't describe it.** Show examples, don't reference them.
2. **Include negative constraints.** Cloud agents create eagerly — say what NOT to create.
3. **Make verification concrete.** "Run `npm test -- --grep 'rateLimit'` and expect 5 passing" beats "tests pass."
4. **Assume no context.** If it matters, embed it.
5. **Order steps by dependency.** Each step completable given only previous steps.
