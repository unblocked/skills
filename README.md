# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblock](skills/unblock/) | Context gathering workflows for software engineering — helps engineers bring external context (PRs, Slack, Jira, docs) into their coding environment |
| [review-pr](skills/review-pr/) | Context-aware PR review — hydrates the reviewer with team conventions and prior art, then categorizes findings with Unblocked citations |
| [write-pr-description](skills/write-pr-description/) | Context-grounded PR descriptions — explains the reasoning, trade-offs, and team context behind a change, not just the diff |
| [investigate](skills/investigate/) | Structured incident and bug investigation — correlates symptoms with recent changes, prior incidents, and team knowledge |
| [onboard-codebase](skills/onboard-codebase/) | Produces a persistent orientation document for a codebase — architecture, key decisions, conventions, domain experts |
| [refactor](skills/refactor/) | Refactoring with implicit contract preservation — scopes dependencies, hydrates conventions, and explicitly preserves team contracts |
| [handoff](skills/handoff/) | Session continuity — captures reasoning, decisions, and progress into a handoff document for the next session |
| [cloud-plan](skills/cloud-plan/) | Plans for headless/cloud agents — front-loads all context and embeds it inline for agents without MCP access |
| [unblock-team](skills/unblock-team/) | Multi-agent orchestration — sets up agent teams with plan-first, implement-second structure using dedicated planner and reviewer agents |

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
| Handoff Nudge | Stop | Reminds the user to run `/handoff` if there appears to be unfinished work |

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
cp -r skills/review-pr ~/.claude/skills/
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
    ├── review-pr/                # Context-aware PR review
    ├── write-pr-description/     # Context-grounded PR descriptions
    ├── investigate/              # Structured bug/incident investigation
    ├── onboard-codebase/         # Codebase orientation documents
    ├── refactor/                 # Contract-preserving refactoring
    ├── handoff/                  # Session continuity
    ├── cloud-plan/               # Plans for headless/cloud agents
    └── unblock-team/             # Multi-agent orchestration
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

It's Tuesday morning and payments are failing with timeout errors. Instead of reading code blind, `/investigate` correlates the symptoms with what actually changed.

```
You:  /investigate Payments timing out since this morning, seeing
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

Instead of an hour of log-reading and code-tracing, the agent found the root cause in minutes by checking what changed and whether it happened before — context that lives in your PRs and history, not in the code.

### 3. Multi-session refactor with handoff between sessions

You're refactoring the auth middleware from Express to Fastify. It's a multi-day effort. At the end of your first session, you've completed the adapter layer but haven't migrated the routes yet.

```
── Session 1 ──

You:  /refactor Migrate auth middleware from Express to Fastify

Agent: [Works through SCOPE → HYDRATE → PLAN → REVIEW → EXECUTE]
       Discovers consumers, migration patterns from PR #890, implicit
       contracts (session format, error response shape, header conventions)...
       Completes the adapter layer.

You:  /handoff

Agent: Capturing session state...
       Saved to .claude/handoffs/2025-01-15-16-30-auth-fastify-migration.md

       Handoff includes:
       - Approach: strangler fig pattern per team convention from PR #890
       - Done: adapter layer in src/auth/fastify-adapter.ts
       - Remaining: migrate 12 route handlers, update tests
       - Key context: session cookie format must stay {sid, exp, uid} per PR #445
       - Failed approach: tried direct port but middleware signature
         differences broke 3 implicit contracts

── Session 2 (next day) ──

[SessionStart hook fires, detects handoff document]

Agent: Loaded handoff from previous session. Continuing auth middleware
       migration. Adapter layer is complete. Next: migrate route handlers,
       preserving session cookie format {sid, exp, uid}.
```

Session 2 picks up exactly where session 1 left off — with the decisions, failed approaches, and gathered context intact. No re-querying, no re-discovery.

### 4. Prepare a plan for a cloud agent to execute without MCP access

You need to add a feature but want to run the implementation on a remote Claude instance or in CI. The remote agent won't have access to Unblocked's MCP tools, so `/cloud-plan` front-loads all the context and embeds it directly in the plan.

```
You:  /cloud-plan Add user notification preferences API endpoint

Agent: [Phase 1 — HYDRATE DEEPLY]
       Running extended queries (12 instead of the usual 6)...
       Gathering conventions, naming patterns, error handling examples,
       testing patterns, existing utilities, related PRs, review comments...

       [Phase 2 — PLAN WITH EMBEDDED CONTEXT]
       Building self-contained plan with inline code examples...

       Instead of "follow the team's error handling pattern," the plan says:

       > Error handling: wrap service calls in try/catch, log with
       > logger.error({ err, context }), return { error: string, code: number }.
       > Example from src/api/users.ts:
       > [actual code snippet pasted inline]

       Instead of "check related PRs," the plan embeds:

       > PR #456 "Add email preferences" — introduced the preferences
       > table with columns: user_id, channel (enum: email|sms|push),
       > enabled (boolean). Follow this schema for notification preferences.

       [Phase 3 — REVIEW]
       Validating completeness — is enough context embedded for a
       context-blind agent?

       [Phase 4 — PACKAGE]
       Saved self-contained plan to cloud-plan-notification-prefs.md

You:  claude --headless --plan cloud-plan-notification-prefs.md
```

The cloud agent gets a plan where every convention is shown with code examples, every decision is quoted with rationale, and every constraint is explicit. It can implement without ever calling Unblocked.

### 5. Coordinate a multi-agent team on a cross-cutting feature

You're adding a new billing system that touches the API, database, background jobs, and frontend. Instead of one agent struggling with the entire scope, `/unblock-team` sets up a coordinated team where planning happens first and implementation parallelizes.

```
You:  /unblock-team Add usage-based billing with metering, invoicing, and a
      billing dashboard

Agent: [Phase 1 — ASSESS]
       This decomposes into 4 independent systems. Recommending Large Team:
       Planner + 3 parallel Implementers + Reviewer.

       [Phase 2 — DECOMPOSE]
       Querying Unblocked for system boundaries and dependencies...

       Unit A: Metering API (src/api/metering/) — new endpoints, event ingestion
       Unit B: Invoice generation (src/jobs/billing/) — background job, PDF generation
       Unit C: Billing dashboard (src/ui/billing/) — React components, API integration
       Dependencies: A must define the metering event schema before B and C start.
                     B and C are independent of each other.

       [Phase 3 — PLAN (Planner Agent)]
       Planner agent hydrates context for all 3 units from Unblocked,
       drafts plans grounded in team patterns, reviews each against
       organizational context...

       3 reviewed plans produced. Presenting for your approval:
       - Unit A plan: [summary]
       - Unit B plan: [summary]
       - Unit C plan: [summary]

You:  Looks good, go ahead.

       [Phase 4 — IMPLEMENT]
       Implementer A: Building metering API (defines event schema first)
       Implementer B: Building invoice generation (parallel, uses schema from plan)
       Implementer C: Building billing dashboard (parallel, uses schema from plan)

       [Phase 5 — REVIEW (Reviewer Agent)]
       Reviewer agent reviews ALL changes together — catches that Implementer B
       used a different date format than Implementer C, and that both created
       a formatCurrency helper instead of using the existing one in src/lib/format.ts.

       [Phase 6 — INTEGRATE]
       Merging all units, resolving the review findings, running full test suite.
```

The planner gathered context once and produced plans for all three units. The implementers worked in parallel without duplicating context queries. The reviewer caught cross-unit inconsistencies that per-unit reviews would have missed. Total context-gathering cost: one planning phase instead of three separate full hydrations.
