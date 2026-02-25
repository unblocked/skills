---
name: handoff
description: >
  Captures session state for continuity between sessions. Summarizes what was
  planned, done, remaining, decisions made, and context gathered — then persists
  a structured handoff document that the next session picks up automatically via
  the SessionStart hook. Use when ending a session with unfinished work, switching
  contexts, or handing work to another agent or teammate.
---

# Session Handoff

Captures the current session's state — reasoning, decisions, progress, and context — into
a structured handoff document. The next session picks this up automatically (via the
SessionStart hook) and can continue where this session left off without re-gathering
context.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. CAPTURE        (Agent)                                   │
│     │              Summarize: planned, done, remaining,      │
│     │              decisions, context gathered                │
│     ▼                                                        │
│  2. STRUCTURE      (Agent)                                   │
│     │              Handoff document with file references,    │
│     │              next steps, rationale                     │
│     ▼                                                        │
│  3. PERSIST        (Agent)                                   │
│     │              Save to .claude/handoffs/                 │
│     ▼                                                        │
│     DONE — next session picks up automatically               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Capture reasoning, not just state.** The next session needs to know *why* decisions were made, not just what was done.
- **Be specific.** Name files, reference PRs, quote Unblocked findings. Generic summaries don't help.
- **Include what didn't work.** Failed approaches save the next session from re-trying them.
- **Keep it concise.** The handoff should be scannable in under 2 minutes.
- **Automate pickup.** The SessionStart hook detects handoff documents — the IC doesn't have to remember to load them.

---

## Phase 1: Capture (Agent)

Summarize the current session's state. Review what happened in this session and
extract the key information.

### What to Capture

1. **Task:** What was the original task/goal?
2. **Plan:** What approach was chosen? (reference the plan if one was created)
3. **Progress:** What's done, what's in progress, what hasn't started?
4. **Decisions:** What decisions were made and why? What trade-offs were accepted?
5. **Context Gathered:** Key findings from Unblocked queries (the context that took time to gather)
6. **Blockers:** What's blocked and why? What information is needed?
7. **Failed Approaches:** What was tried and didn't work? Why?

### Assess Completeness

- What percentage of the task is complete?
- Can the remaining work be done without additional context?
- Are there open questions that need human input?

---

## Phase 2: Structure (Agent)

Organize the captured information into a handoff document using the template in
`references/handoff-template.md`.

**The document must:**

1. Stand alone — the next session should understand it without the conversation history
2. Prioritize next steps — what should the next session do first?
3. Reference specific files — not "the auth module" but `src/auth/middleware.ts:45`
4. Include Unblocked context — key findings that took time to gather, so the next session doesn't re-query
5. Flag open questions — what still needs human input?

---

## Phase 3: Persist (Agent)

Save the handoff document so the next session picks it up automatically.

### Save Location

Save to `.claude/handoffs/` in the repository root:

```
.claude/handoffs/YYYY-MM-DD-HH-MM-[brief-description].md
```

Example: `.claude/handoffs/2025-01-15-14-30-rate-limiting-api.md`

### After Saving

Confirm to the user:
- Where the handoff was saved
- What the next session will see (the SessionStart hook loads it)
- Any actions the user should take before ending the session (e.g., commit changes, push branch)

---

## Tool Selection

This skill primarily uses agent capabilities (reading conversation history, summarizing).
Unblocked tools are used if additional context is needed:

| Question | Tool |
|---|---|
| Current state of files | Read, Grep, Glob |
| Git status and diff | Bash (git commands) |
| Context for handoff | Reference earlier Unblocked queries from the session |
