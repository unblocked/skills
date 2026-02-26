# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblock](skills/unblock/) | Context gathering workflows for software engineering — helps engineers bring external context (PRs, Slack, Jira, docs) into their coding environment |
| [unblock-plan](skills/unblock-plan/) | Context-rich planning — hydrates and validates implementation plans against org knowledge, no codegen |
| [unblock-review](skills/unblock-review/) | Code review with org context — checks diffs/PRs against team conventions, patterns, and prior decisions |
| [unblock-tix-enrich](skills/unblock-tix-enrich/) | Ticket enrichment — gathers and adds org context to tickets for engineering or support teams |
| [unblock-debug](skills/unblock-debug/) | Bug investigation — structured root-cause analysis hydrated with org context |
| [unblock-explore](skills/unblock-explore/) | Codebase orientation — builds a mental map of unfamiliar code areas |
| [unblock-incident](skills/unblock-incident/) | Incident response — rapid context for on-call engineers investigating production issues |
| [unblock-handoff](skills/unblock-handoff/) | Context transfer — creates handoff documents for humans or agents picking up work |

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

# Cursor
cp -r skills/unblock .cursor/skills/
```
