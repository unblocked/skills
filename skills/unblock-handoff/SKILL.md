---
name: unblock-handoff
description: >
  Captures session state for continuity between sessions. Summarizes what was
  planned, done, remaining, decisions made, and context gathered — then persists
  a structured handoff document that the next session picks up automatically via
  the SessionStart hook. Use when ending a session with unfinished work, switching
  contexts, or handing work to another agent or teammate.
---

# Session Handoff

Captures the current session's state into a structured handoff document. The next session
picks this up automatically via the SessionStart hook.

## Rules

- **Capture reasoning, not just state.** The next session needs *why* decisions were made.
- **Be specific.** Name files, reference PRs, quote Unblocked findings.
- **Include what didn't work.** Failed approaches save the next session from re-trying.

---

## Phase 1: Capture (Agent)

Review the session and extract:

1. **Task:** Original task/goal
2. **Plan:** Approach chosen and why
3. **Progress:** Done, in progress, not started
4. **Decisions:** What was decided and why, trade-offs accepted
5. **Context Gathered:** Key Unblocked findings (took time to gather — don't re-query)
6. **Blockers:** What's blocked and why
7. **Failed Approaches:** What was tried and didn't work

### Assess Completeness

- Percentage complete?
- Can remaining work proceed without additional context?
- Open questions needing human input?

---

## Phase 2: Structure (Agent)

Organize into a handoff document using `references/handoff-template.md`.

The document must:
1. Stand alone — understandable without conversation history
2. Prioritize next steps — what should the next session do first?
3. Reference specific files — `src/auth/middleware.ts:45`, not "the auth module"
4. Include Unblocked context — key findings so next session doesn't re-query
5. Flag open questions — what needs human input?

---

## Phase 3: Persist (Agent)

Save to `.claude/handoffs/` in the repository root:

```
.claude/handoffs/YYYY-MM-DD-HH-MM-[brief-description].md
```

Confirm to the user:
- Where the handoff was saved
- What the next session will see (SessionStart hook loads it)
- Any actions to take before ending (commit, push branch)

---

## Tool Selection

| Question | Tool |
|---|---|
| Current state of files | Read, Grep, Glob |
| Git status and diff | Bash (git commands) |
| Context for handoff | Reference earlier Unblocked queries from the session |
