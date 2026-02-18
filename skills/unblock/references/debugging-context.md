# Bug Investigation Context Workflow

Complete workflow for gathering context when debugging issues.

**With [Unblocked MCP](https://getunblocked.com/docs/mcp), you can query across git, PRs, Slack, and issues simultaneously.**

---

## Phase 1: Understand the Bug (2 min)

### Gather Symptoms

| Question | Answer |
|----------|--------|
| What is happening? | |
| What should happen? | |
| When did it start? | |
| Is it reproducible? | |
| Who reported it? | |

### Initial Scope

- Which system/component is affected?
- Is it user-facing or internal?
- What's the severity/impact?
- Are there workarounds?

---

## Phase 2: Recent Changes Investigation (5-10 min)

The bug probably started because something changed. Find what.

### Git History

**Manual:**
```bash
# See recent commits to affected files
git log --oneline -20 -- <affected files>

# See what changed in each commit
git log -p --since="1 week ago" -- <affected files>

# Find when a specific line was changed
git log -S "<problematic code>" --oneline
```

**With Unblocked:**
```
"What changed recently in [file/system]?"
"When was [function/code] last modified and why?"
```

### Recent Deployments

**Manual:**
- Check deployment history
- Review release notes
- Check for config changes

**With Unblocked:**
```
"What went out in the last deployment affecting [area]?"
```

### Related PRs

**Manual:**
- Search GitHub/GitLab for recent PRs to affected files
- Read PR descriptions and review comments
- Look for noted risks or follow-ups

**With Unblocked:**
```
"Show me recent PRs that touched [file/system]"
```

---

## Phase 3: Bug History (5 min)

Has this happened before?

### Search for Similar Issues

**Manual:**
- Search Jira/Linear for similar error messages
- Search GitHub issues
- Search Slack for error symptoms

**With Unblocked:**
```
"Has this [error/bug] been reported before?"
"What's the history of issues with [system]?"
```

### Find Past Fixes

If this was fixed before, the fix might have regressed.

**Manual:**
```bash
# Search for fixes in commit messages
git log --all --grep="fix" --grep="<area>" --all-match --oneline
```

**With Unblocked:**
```
"How was [similar bug] fixed previously?"
```

---

## Phase 4: Code Archaeology (5-10 min)

Understand the code you're debugging.

### Git Blame

**Manual:**
```bash
# Find who wrote each line
git blame <file>

# Blame a specific function
git blame -L <start>,<end> <file>

# See blame at a specific commit
git blame <commit>^ -- <file>
```

### Find Original Intent

The code might be doing something unexpected for a reason.

**Manual:**
- Find the PR that introduced the code
- Read the PR description
- Read the review comments
- Check linked tickets

**With Unblocked:**
```
"Why does [function] work this way?"
"What was the original intent of [code block]?"
```

---

## Phase 5: Root Cause Analysis

Before fixing, understand WHY the bug exists.

### Questions to Answer

| Question | Answer |
|----------|--------|
| What changed to cause this? | |
| Why didn't tests catch it? | |
| Is this a symptom of a larger issue? | |
| Are there similar bugs elsewhere? | |

### Fix Confidence Check

Don't fix until you can explain:
1. What the bug is
2. Why it's happening
3. Why your fix solves it
4. What else your fix might affect

---

## Example: Payment Timeout Bug

### Bug Report
"Payments failing with timeout errors since Tuesday's deploy"

### Context Gathering (Unblocked)
```
"What changed in the payment system this week?"
"Has the payment timeout issue happened before?"
```

### Context Gathered

**From Git:**
```
Tuesday: PR #567 merged - "Refactor payment retry logic"
Monday: PR #568 merged - "Update timeout configs"
```

**From PR #567:**
- Changed retry logic, inadvertently reset timeout to default
- No tests for timeout configuration

**From Historical Search:**
- Same bug occurred 6 months ago
- Fixed in PR #234 by increasing timeout from 5s to 10s
- Payment provider is slow during peak hours

**Root Cause:**
- PR #567 overwrote the timeout config instead of merging
- Timeout went from 10s back to 5s default
- No test to catch this regression

### Fix Plan
1. Restore 10s timeout
2. Add test for timeout configuration
3. Consider: extract timeouts to constants file
4. Consider: audit other configs for similar issues

---

## Debugging Context Checklist

Before you write the fix:

- [ ] I know WHEN the bug started
- [ ] I know WHAT changed to cause it
- [ ] I know WHY the code behaves this way
- [ ] I've checked if this happened before
- [ ] I understand the original intent of the code
- [ ] I know what else my fix might affect

---

## Resources

- [Unblocked](https://getunblocked.com) - Query your codebase history in natural language
- [Unblocked MCP Setup](https://getunblocked.com/docs/mcp) - Connect to your AI tools
