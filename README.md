# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblock](skills/unblock/) | Context gathering workflows for software engineering — helps engineers bring external context (PRs, Slack, Jira, docs) into their coding environment |

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