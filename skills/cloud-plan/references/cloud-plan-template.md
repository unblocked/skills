# Cloud Plan Template

Self-contained plan document for headless/cloud agents. Every piece of context
the agent needs is embedded directly — no external tool calls required.

---

## Template

```markdown
# Cloud Plan: [Task Description]

> Generated: [date]
> Repo: [repository name]
> Branch: [target branch]
> For: Headless agent execution (no MCP access)

## Task

[Clear description of what to implement. Include acceptance criteria.]

## Codebase Context

### Architecture
[Relevant architecture context — what the agent needs to know about the system.]

### Key Files
| File | Purpose | Relevance |
|------|---------|-----------|
| `[path]` | [what it does] | [why the agent needs to know about it] |

### Existing Patterns

[Team patterns with code examples. Show, don't tell.]

#### [Pattern Name]
```[language]
// From [file path]
[actual code example from the codebase]
```
[Explain when and how this pattern is used.]

#### [Pattern Name]
```[language]
// From [file path]
[actual code example from the codebase]
```
[Explain when and how this pattern is used.]

### Related PRs and Decisions

| PR/Decision | Summary | Relevance |
|-------------|---------|-----------|
| PR #[N] "[title]" | [what it did] | [why it matters for this task] |
| Decision: [topic] | [what was decided] | [how it constrains this task] |

## Conventions

[Explicit rules the agent must follow. Be specific.]

- **Naming:** [file naming, function naming, variable naming conventions]
- **Error handling:** [exact pattern with example]
- **Testing:** [testing approach, file organization, assertion style]
- **File organization:** [where new files go, how to organize]
- **Imports:** [import ordering, absolute vs. relative]

## Implementation Steps

[Step-by-step instructions. Each step should be independently verifiable.]

### Step 1: [Action]
- **Files:** `[path]`
- **Do:** [specific instruction]
- **Pattern:** [reference the pattern from above]
- **Verify:** [how to check this step is correct]

### Step 2: [Action]
- **Files:** `[path]`
- **Do:** [specific instruction]
- **Pattern:** [reference the pattern from above]
- **Verify:** [how to check this step is correct]

[Continue for all steps...]

## Constraints

[What the agent must NOT do. As important as what it should do.]

- DO NOT [constraint 1 — e.g., "create new utility files; use existing utilities in src/lib/"]
- DO NOT [constraint 2 — e.g., "use direct database access; all queries go through the repository layer"]
- DO NOT [constraint 3 — e.g., "add new dependencies without checking if an existing one covers the use case"]

## Verification

[How to confirm the implementation is correct.]

1. [ ] [Verification step — e.g., "All existing tests pass"]
2. [ ] [Verification step — e.g., "New tests cover the added functionality"]
3. [ ] [Verification step — e.g., "Naming follows conventions listed above"]
4. [ ] [Verification step — e.g., "No new utilities created that duplicate existing ones"]
```

---

## Tips for Effective Cloud Plans

1. **Paste code, don't describe it.** "The error handling pattern looks like [code]" beats "use the team's error handling pattern."

2. **Include negative constraints.** Cloud agents are eager to create new files and utilities. Explicitly say what NOT to create.

3. **Make verification concrete.** "Tests pass" is vague. "Run `npm test -- --grep 'rateLimit'` and expect 5 passing tests" is actionable.

4. **Assume no context.** The cloud agent knows nothing beyond this document and the codebase files. If it matters, embed it.

5. **Order steps by dependency.** Each step should be completable given only the previous steps.
