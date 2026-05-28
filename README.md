# Unblocked Skills

Public repository for [Unblocked](https://getunblocked.com) Agent Skills.

Skills are modular, self-contained packages that extend AI coding agents with specialized knowledge and workflows. They follow the open [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

| Skill | Description |
|-------|-------------|
| [unblocked-context-research](skills/unblocked-context-research/) | Unified context retrieval across code, PRs, docs, messages, and issues via `context_research` — semantic lookups, structured data queries, and multi-source research in a single tool |
| [unblocked-context-search-code](skills/unblocked-context-search-code/) | Code-only semantic search across connected repos via `context_search_code` |
| [unblocked-context-search-prs](skills/unblocked-context-search-prs/) | PR descriptions and review discussions via `context_search_prs` — decision history and change reasoning |
| [unblocked-context-search-issues](skills/unblocked-context-search-issues/) | Issue tracker search via `context_search_issues` — bugs, tasks, and epics across Jira, Linear, and Asana |
| [unblocked-context-search-documentation](skills/unblocked-context-search-documentation/) | Documentation search via `context_search_documentation` — wikis, runbooks, ADRs, and API references |
| [unblocked-context-search-messages](skills/unblocked-context-search-messages/) | Team conversation search via `context_search_messages` — Slack and Microsoft Teams threads |
| [unblocked-context-query-issues](skills/unblocked-context-query-issues/) | Structured, filtered issue retrieval via `context_query_issues` — scoped by project and person |
| [unblocked-context-query-prs](skills/unblocked-context-query-prs/) | Structured, filtered PR retrieval via `context_query_prs` — scoped by repository and person |
| [unblocked-context-get-urls](skills/unblocked-context-get-urls/) | Direct URL content resolution via `context_get_urls` — PRs, issues, docs, and public pages |
| [unblocked-context-search-rules](skills/unblocked-context-search-rules/) | Reranked search across a repository's coding rules and conventions via `context_search_rules` — returns the top-K rules most relevant to a specific task |
| [unblocked-tools-guide](skills/unblocked-tools-guide/) | Tool selection guide and legacy-name mapping for Unblocked search tools |

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
