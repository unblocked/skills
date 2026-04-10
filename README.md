# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblocked-context-engine](skills/unblocked-context-engine/) | Focused institutional-context lookups for architecture, conventions, prior art, and plan validation |
| [unblocked-research](skills/unblocked-research/) | Deep investigation across code, PRs, docs, Slack, and Jira when the agent needs to understand how something works, what changed, or what risks exist |
| [unblocked-data-retrieval](skills/unblocked-data-retrieval/) | Targeted record retrieval for Jira issues, Slack channels/threads, and pull requests — direct lookups, filtered queries, and activity checks |
| [unblocked-context-search](skills/unblocked-context-search/) | Unified context retrieval — semantic lookups, structured data queries, and multi-source research through a single `context_search` tool |

## Setup

### Unblocked CLI (Recommended)

The fastest way to get started. Installs the Unblocked CLI, configures the MCP server for your agentic coding tools (Claude Code, Codex, Cursor), triggers Oauth with Unblocked, and installs skills — all in one command:

```bash
curl -fsSL https://getunblocked.com/install-mcp.sh | bash
```

### Claude Plugin

Connect this repository as a plugin directly in Claude Code:

```bash
claude plugin marketplace add unblocked/skills
claude plugin install unblocked-skills
```

### Using the Skills CLI

```bash
npx skills add unblocked/skills
```

### Manual Copy

Copy the skill directory into your agent's skills folder. Replace `<skill-name>` with a directory such as `unblocked-data-retrieval` or `unblocked-context-engine`:

```bash
# Claude Code
cp -r skills/<skill-name> ~/.claude/skills/

# Cursor
cp -r skills/<skill-name> .cursor/skills/
```
