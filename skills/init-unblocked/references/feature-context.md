# Feature Implementation Context Workflow

Complete workflow for gathering context before implementing a new feature.

**With [Unblocked MCP](https://getunblocked.com/docs/mcp), most of this is automated with a single query.**

---

## Phase 1: Understand the Request (2-5 min)

### Questions to Answer
- What is the user-facing outcome?
- What are the acceptance criteria?
- What's in scope vs out of scope?

### Where to Look

| Source | What to Find |
|--------|--------------|
| Jira/Linear ticket | Requirements, acceptance criteria, stakeholders |
| Product spec/PRD | Full context, mockups, edge cases |
| Slack thread | Informal discussions, quick decisions |

**Manual:** Open each source, search for the feature name, read through.

**With Unblocked:**
```
"What are the requirements for [feature name]?"
```

---

## Phase 2: Technical Discovery (5-10 min)

### Find Similar Implementations

Look for existing code that does something similar. This shows you:
- Patterns used in this codebase
- Available utilities and helpers
- Testing approaches

**Manual:**
```bash
# Search for similar functionality
git log --all --oneline --grep="<similar feature>"
grep -r "<pattern>" --include="*.ts" src/
```

**With Unblocked:**
```
"Show me how similar features like [X] were implemented"
```

### Identify Touch Points

What will your feature need to interact with?

| Layer | Questions |
|-------|-----------|
| API | New endpoints? Modify existing? |
| Database | New tables/columns? Migrations? |
| Services | What services will you call? |
| UI | New components? Modify existing? |

### Check for Constraints

**Manual:**
```bash
# Find performance-related discussions
git log --all --grep="performance" --oneline -- <relevant files>
# Check for security reviews
git log --all --grep="security" --oneline -- <relevant files>
```

**With Unblocked:**
```
"Are there performance or security constraints for [area]?"
```

---

## Phase 3: Historical Context (5 min)

### Find Previous Attempts

Was this feature tried before? What happened?

**Manual:**
```bash
# Search for the feature in commit history
git log --all --oneline --grep="<feature name>"
# Search for related PRs on GitHub
# Search Slack for "#feature-name" or discussions
```

**With Unblocked:**
```
"Has [feature] been attempted before? What happened?"
```

### Understand Design Decisions

Why does the current architecture look the way it does?

**Manual:**
- Search for ADRs (Architecture Decision Records)
- Find the PR that created the system you're modifying
- Read PR description and review comments

**With Unblocked:**
```
"Why was [system] designed this way?"
```

### Identify Domain Experts

Who should you ask if you get stuck?

**Manual:**
```bash
# Find who wrote the relevant code
git blame <file> | cut -d'(' -f2 | cut -d' ' -f1 | sort | uniq -c | sort -rn
# Find who reviewed recent PRs to this area
```

**With Unblocked:**
```
"Who are the experts on [system/area]?"
```

---

## Phase 4: Synthesize Context

Before you start coding, you should be able to answer:

| Question | Your Answer |
|----------|-------------|
| What am I building? | |
| Why is it needed? | |
| What patterns should I follow? | |
| What systems will I touch? | |
| Who can help if I'm stuck? | |
| What are the risks/unknowns? | |

If you can't answer these, gather more context.

---

## Example: Adding Notification Preferences

### Context Query (Unblocked)
```
"What do I need to know to implement user notification preferences?"
```

### Context Gathered

**From Jira:**
- Ticket describes: users should choose email, SMS, push channels
- Acceptance criteria lists specific preference combinations

**From PRs:**
- PR #1234 added email notifications (follow this pattern)
- PR #1456 added the preferences table structure

**From Slack:**
- #eng discussion about rate limiting (implement this)
- Decision to use async queue for all notifications

**From Code:**
- `/src/notifications/sender.ts` - current dispatch logic
- `/src/users/preferences.ts` - existing preferences pattern

**Experts:**
- @sarah - notification system
- @mike - user preferences

### Ready to Implement
With this context, you can:
- Follow established patterns
- Avoid duplicating mistakes
- Ask focused questions
- Write a PR description that shows you understand the system

---

## Resources

- [Unblocked](https://getunblocked.com) - Automate this entire workflow
- [Unblocked MCP Setup](https://getunblocked.com/docs/mcp) - Connect to your AI tools
