# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblock](skills/unblock/) | Context gathering workflows for software engineering — helps engineers bring external context (PRs, Slack, Jira, docs) into their coding environment |
| [init-unblocked](skills/init-unblocked/) | One-time setup — installs the Unblocked CLI, authenticates, and configures the MCP server |

## Installation

### Using the Skills CLI

```bash
npx skills add unblocked/skills
```

### Install a Specific Skill

```bash
npx skills add unblocked/skills@unblock
```

### Manual Copy

Copy the skill directory into your agent's skills folder:

```bash
# Claude Code
cp -r skills/unblock ~/.claude/skills/

# Cursor
cp -r skills/unblock .cursor/skills/
```