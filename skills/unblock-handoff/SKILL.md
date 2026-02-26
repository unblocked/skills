---
name: unblock-handoff
description: >
  Context transfer — creates handoff documents for humans or agents picking up
  work. Gathers work history, system context, and decisions, then tailors
  output to the recipient type.
---

# Unblocked Context Handoff

Creates context transfer documents for humans or agents picking up work.

## Rules

- **Context is the bottleneck.** The recipient's biggest cost is ramping up — minimize it.
- **Be explicit about state.** Clearly mark what's done, in-progress, and blocked.
- **Include "why" not just "what."** Decisions and constraints transfer poorly without rationale.
- **Cite sources.** Link to PRs, Slack threads, docs — let the recipient dig deeper.

---

## Inputs

Area, feature, or system to hand off. Optional: recipient type (human or agent).

---

## Phase 1: Scope

Establish what's being handed off:

- What work is being transferred? (feature, bug fix, investigation, system ownership)
- What systems/areas are involved?
- Who is the recipient? (teammate, cloud agent like Codex, subagent in a swarm, future self)

---

## Phase 2: Work History (Unblocked)

Gather the history of work being handed off.

1. `data_retrieval`: recent and open PRs in the affected area
2. `historical_context`: "What decisions were made about [area]? Any direction changes?"
3. `historical_context`: "What discussions happened about [feature/system] recently?"
4. `unblocked_context_engine`: "What is the current state of [feature/system]?"

**Capture:** completed work, in-progress work, open questions, blockers, direction changes.

---

## Phase 3: System Context (Unblocked)

Gather the context the recipient will need to work effectively.

1. `unblocked_context_engine`: "How does [system] work? What are the key components?"
2. `unblocked_context_engine`: "What conventions and patterns does the team follow in [area]?"
3. `historical_context`: "What architectural decisions constrain [area]? Known issues?"
4. `data_retrieval`: domain experts and active contributors

---

## Phase 4: Synthesize

Tailor the output to the recipient type.

### Agent recipients (actionable):

Agents need precise, structured instructions they can act on immediately.

- **Current state** — what's done, what's in progress, what's blocked
- **Files to modify** — specific paths and what needs to change
- **Patterns to follow** — conventions with examples from the codebase
- **Constraints** — decisions that must not be violated, with rationale
- **Acceptance criteria** — how to know when the work is complete
- **Related PRs** — links for additional context

### Human recipients (understandable):

Humans need narrative context they can internalize and apply with judgment.

- **Background** — why this work exists, what problem it solves
- **Progress** — what's been done, what's left, current state
- **Key decisions** — choices made and why, alternatives considered
- **Open questions** — unresolved issues that need judgment calls
- **Blockers** — what's preventing progress and potential paths forward
- **Experts** — who to ask for help, with specific areas of expertise
- **Related links** — PRs, tickets, docs, Slack threads
- **Next steps** — recommended priority order for remaining work

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
