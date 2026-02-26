# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblock](skills/unblock/) | Context gathering workflows for software engineering — helps engineers bring external context (PRs, Slack, Jira, docs) into their coding environment |
| [unblock-review](skills/unblock-review/) | Context-aware PR review — hydrates the reviewer with team conventions and prior art, then categorizes findings with Unblocked citations |
| [unblock-describe](skills/unblock-describe/) | Context-grounded PR descriptions — explains the reasoning, trade-offs, and team context behind a change, not just the diff |
| [unblock-investigate](skills/unblock-investigate/) | Structured incident and bug investigation — correlates symptoms with recent changes, prior incidents, and team knowledge |
| [unblock-onboard](skills/unblock-onboard/) | Produces a persistent orientation document for a codebase — architecture, key decisions, conventions, domain experts |
| [unblock-refactor](skills/unblock-refactor/) | Refactoring with implicit contract preservation — scopes dependencies, hydrates conventions, and explicitly preserves team contracts |
| [unblock-handoff](skills/unblock-handoff/) | Session continuity — captures reasoning, decisions, and progress into a handoff document for the next session |
| [unblock-cloud-plan](skills/unblock-cloud-plan/) | Plans for headless/cloud agents — front-loads all context and embeds it inline for agents without MCP access |
| [unblock-team](skills/unblock-team/) | Multi-agent orchestration — sets up agent teams with plan-first, implement-second structure using dedicated planner and reviewer agents |
| [unblock-enrich](skills/unblock-enrich/) | Ticket enrichment — gathers org context for tickets before work begins, with engineering and support modes |

## Agents

Specialized subagents for multi-agent workflows:

| Agent | Description |
|-------|-------------|
| [unblocked-planner](agents/unblocked-planner.md) | Planning specialist — runs hydrate, plan, and review phases, producing a reviewed plan for coding agents to execute |
| [unblocked-reviewer](agents/unblocked-reviewer.md) | Review specialist — performs context-aware code review independently of the coding agent, with fresh eyes |

## Hooks

| Hook | Event | Description |
|------|-------|-------------|
| Session Orient | SessionStart | Loads lightweight context at session start — recent PRs, active tickets, and handoff documents from previous sessions |
| Handoff Nudge | Stop | Reminds the user to run `/unblock-handoff` if there appears to be unfinished work |

## Setup

### Unblocked CLI (Recommended)

The fastest way to get started. Installs the Unblocked CLI, configures the MCP server for your agentic coding tools (Claude Code, Codex, Cursor), triggers Oauth with Unblocked, and installs skills — all in one command:

```bash
curl -fsSL https://getunblocked.com/install-mcp.sh | bash
```

### Claude Plugin

Connect this repository as a plugin directly in Claude Code:

```bash
claude plugin add unblocked/skills
```

### Using the Skills CLI

```bash
npx skills add unblocked/skills
```

### Manual Copy

Copy the skill directory into your agent's skills folder:

```bash
# Claude Code
cp -r skills/unblock ~/.claude/skills/
cp -r skills/unblock-review ~/.claude/skills/
# ... (repeat for each skill you want)

# Cursor
cp -r skills/unblock .cursor/skills/
```

## Architecture

```
skills/
├── .claude-plugin/
│   └── marketplace.json          # Plugin configuration with all skills
├── hooks/
│   └── hooks.json                # SessionStart + Stop hooks
├── agents/
│   ├── unblocked-planner.md      # Planning subagent
│   └── unblocked-reviewer.md     # Review subagent
├── scripts/
│   └── session-orient.sh         # SessionStart hook script
└── skills/
    ├── unblock/                  # Core context-aware dev workflow
    ├── unblock-review/           # Context-aware PR review
    ├── unblock-describe/         # Context-grounded PR descriptions
    ├── unblock-investigate/      # Structured bug/incident investigation
    ├── unblock-onboard/          # Codebase orientation documents
    ├── unblock-refactor/         # Contract-preserving refactoring
    ├── unblock-handoff/          # Session continuity
    ├── unblock-cloud-plan/       # Plans for headless/cloud agents
    ├── unblock-team/             # Multi-agent orchestration
    └── unblock-enrich/           # Ticket enrichment
```

All skills follow the same pattern: a `SKILL.md` with YAML frontmatter and workflow documentation, plus a `references/` directory with specialized templates and checklists. Every skill leverages Unblocked's MCP tools for organizational context — no skill builds its own context retrieval.

## Examples

### 1. Build a feature without reinventing what your team already has

You're adding webhook retry logic to the notifications service. Without context, an agent will write retry logic from scratch. With `/unblock`, it first discovers your team already has a retry utility in `src/lib/retry.ts`, that PR #312 established the backoff convention, and that a Slack thread from last month decided on a 3-retry max for external calls.

```
You:  /unblock Add webhook delivery retries to the notification sender

Agent: [Phase 1 — HYDRATE]
       Querying Unblocked for notification sender patterns, retry conventions,
       related PRs...

       Found:
       - src/lib/retry.ts — existing exponential backoff utility
       - PR #312 — established retry pattern with jitter for external calls
       - Slack #backend (Jan 12) — team decided on max 3 retries for webhooks
       - src/notifications/sender.ts — current fire-and-forget dispatch

       [Phase 2 — DRAFT PLAN]
       Plan: Wrap webhook dispatch in existing retry() utility from src/lib/retry.ts,
       configure with maxRetries: 3 per team decision, add dead-letter logging
       after exhaustion following the pattern in PR #312...

       [Phase 3 — REVIEW PLAN against Unblocked context]
       ...
```

The agent reuses your team's retry utility instead of npm-installing a new library, follows the conventions from actual PRs, and respects the decisions your team already made — all before writing a line of code.

### 2. Investigate a production incident in minutes, not hours

It's Tuesday morning and payments are failing with timeout errors. Instead of reading code blind, `/unblock-investigate` correlates the symptoms with what actually changed.

```
You:  /unblock-investigate Payments timing out since this morning, seeing
      "gateway timeout" errors in the payment service logs

Agent: [Phase 1 — TRIAGE]
       Querying failure_debugging with the timeout error...
       Querying Unblocked for payment service architecture...

       [Phase 2 — TIMELINE]
       Building timeline of recent changes:
       - Mon 2pm: PR #567 "Refactor payment retry logic" merged
       - Mon 3pm: PR #568 "Update provider timeout configs" merged
       - Mon 5pm: Deploy v2.3.4 to production (both PRs)
       - Tue 8am: First timeout errors in logs
       - Tue 9am: Error rate spikes

       [Phase 3 — HYPOTHESIZE]
       Checking if this has happened before...

       historical_context found: Same timeout issue occurred 6 months ago,
       fixed in PR #234 by increasing timeout from 5s to 10s. Payment
       provider is slow during peak hours.

       Hypothesis 1: PR #567 reset the timeout config to default (5s),
       overwriting the fix from PR #234. Timeline correlation is strong.

       [Phase 4 — VERIFY]
       Reading PR #567 diff... confirmed. The retry refactor replaced the
       config object wholesale instead of merging, dropping the custom
       timeout value.
```

Instead of an hour of log-reading and code-tracing, the agent found the root cause in minutes by checking what changed and whether it happened before.

### 3. Multi-session refactor with handoff between sessions

You're refactoring the auth middleware from Express to Fastify. It's a multi-day effort.

```
── Session 1 ──

You:  /unblock-refactor Migrate auth middleware from Express to Fastify

Agent: [Works through SCOPE → HYDRATE → PLAN → REVIEW → EXECUTE]
       Discovers consumers, migration patterns from PR #890, implicit
       contracts (session format, error response shape, header conventions)...
       Completes the adapter layer.

You:  /unblock-handoff

Agent: Capturing session state...
       Saved to .claude/handoffs/2025-01-15-16-30-auth-fastify-migration.md

── Session 2 (next day) ──

[SessionStart hook fires, detects handoff document]

Agent: Loaded handoff from previous session. Continuing auth middleware
       migration. Adapter layer is complete. Next: migrate route handlers,
       preserving session cookie format {sid, exp, uid}.
```

Session 2 picks up exactly where session 1 left off — with the decisions, failed approaches, and gathered context intact.

### 4. Prepare a plan for a cloud agent to execute without MCP access

You need to add a feature but want to run the implementation on a remote Claude instance or in CI.

```
You:  /unblock-cloud-plan Add user notification preferences API endpoint

Agent: [Phase 1 — HYDRATE DEEPLY]
       Running extended queries (12 instead of the usual 6)...

       [Phase 2 — PLAN WITH EMBEDDED CONTEXT]
       Instead of "follow the team's error handling pattern," the plan says:

       > Error handling: wrap service calls in try/catch, log with
       > logger.error({ err, context }), return { error: string, code: number }.
       > Example from src/api/users.ts:
       > [actual code snippet pasted inline]

       [Phase 3 — REVIEW]
       Validating completeness...

       [Phase 4 — PACKAGE]
       Saved self-contained plan to cloud-plan-notification-prefs.md

You:  claude --headless --plan cloud-plan-notification-prefs.md
```

The cloud agent gets a plan where every convention is shown with code examples and every constraint is explicit.

### 5. Coordinate a multi-agent team on a cross-cutting feature

You're adding a new billing system that touches the API, database, background jobs, and frontend.

```
You:  /unblock-team Add usage-based billing with metering, invoicing, and a
      billing dashboard

Agent: [Phase 1 — ASSESS]
       Recommending Large Team: Planner + 3 parallel Implementers + Reviewer.

       [Phase 2 — DECOMPOSE]
       Unit A: Metering API (src/api/metering/)
       Unit B: Invoice generation (src/jobs/billing/)
       Unit C: Billing dashboard (src/ui/billing/)

       [Phase 3 — PLAN (Planner Agent)]
       3 reviewed plans produced. Presenting for approval...

You:  Looks good, go ahead.

       [Phase 4 — IMPLEMENT]
       Implementers A, B, C working in parallel...

       [Phase 5 — REVIEW (Reviewer Agent)]
       Catches cross-unit inconsistencies: different date formats,
       duplicate formatCurrency helpers.

       [Phase 6 — INTEGRATE]
       Merging, resolving findings, running full test suite.
```

### 6. Enrich a ticket before starting work

You've been assigned a ticket but need to understand the full context before diving in.

```
You:  /unblock-enrich PROJ-1234

Agent: [Phase 1 — GET TICKET]
       Fetching ticket PROJ-1234: "API returns 500 on large payloads"

       [Phase 2 — CLASSIFY]
       Engineering mode — code bug in API layer.

       [Phase 3 — GATHER CONTEXT]
       - failure_debugging: found similar 500 errors from 3 months ago
       - historical_context: PR #789 added payload size limits but
         didn't handle the error gracefully
       - data_retrieval: 2 related tickets filed in the last month

       [Phase 4 — SYNTHESIZE]
       Enrichment document produced with affected systems, related PRs,
       prior incidents, and suggested direction.

       Attach this to PROJ-1234 before starting work.
```
