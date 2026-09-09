# Unblocked MCP and agent skills

[Unblocked](https://getunblocked.com) gives coding agents organizational context from code, pull requests, docs, issues, and conversations. Unblocked MCP makes that context available through the Model Context Protocol. Agent skills teach agents when and how to use it.

This repository contains public connection documentation, [MCP Registry metadata](server.json), and agent skills. It does not contain the hosted server's implementation. The skills follow the open [Agent Skills specification](https://agentskills.io/specification).

## Connect to hosted Unblocked MCP

You need an Unblocked account with access to your team's workspace. Your team must connect its data sources to provide organizational context. See [account and team setup](https://docs.getunblocked.com/inviting-users) and [data source setup](https://docs.getunblocked.com/configuring-data-sources). If your team requires license approval, ask an admin for access.

1. Add a remote MCP server in a client that supports Streamable HTTP and OAuth.
2. Set the server URL to `https://getunblocked.com/api/mcpsse`.
3. Select Streamable HTTP, sometimes shown as HTTP in the client.
4. Follow the client's OAuth prompt. Sign in to Unblocked and authorize the connection.

The `mcpsse` path is historical. The endpoint uses Streamable HTTP. The OAuth connection does not require a static API token or a manually configured authorization header.

See the [current remote connection instructions](https://docs.getunblocked.com/unblocked-mcp/install-other#remote-mcp) for client setup and authentication details.

## MCP tools

The hosted MCP server exposes two tools:

| MCP tool | Purpose |
|----------|---------|
| [`context_research`](https://docs.getunblocked.com/unblocked-mcp/mcp-context-research) | Research across code, pull requests, docs, issues, and conversations. Returns an answer with source citations. |
| [`context_get_urls`](https://docs.getunblocked.com/unblocked-mcp/mcp-context-get-urls) | Retrieve content from one or more known URLs. |

MCP tools, CLI commands, and skills are separate. The [Unblocked CLI](https://docs.getunblocked.com/unblocked-cli/cli-overview) provides commands such as `unblocked context-research` and `unblocked context-get-urls`. It also provides `context-search-*` and `context-query-*` commands. Those extra commands are not hosted MCP tools. The skills below guide agents through these workflows.

## Available skills

| Skill | Description |
|-------|-------------|
| [unblocked-context-research](skills/unblocked-context-research/) | Research across connected sources using the CLI or MCP |
| [unblocked-context-search-code](skills/unblocked-context-search-code/) | Search code across connected repositories using the CLI |
| [unblocked-context-search-prs](skills/unblocked-context-search-prs/) | Search pull request descriptions and reviews using the CLI |
| [unblocked-context-search-issues](skills/unblocked-context-search-issues/) | Search issue trackers using the CLI |
| [unblocked-context-search-documentation](skills/unblocked-context-search-documentation/) | Search documentation using the CLI |
| [unblocked-context-search-messages](skills/unblocked-context-search-messages/) | Search team conversations using the CLI |
| [unblocked-context-query-issues](skills/unblocked-context-query-issues/) | Retrieve issues filtered by project and person using the CLI |
| [unblocked-context-query-prs](skills/unblocked-context-query-prs/) | Retrieve pull requests filtered by repository and person using the CLI |
| [unblocked-context-get-urls](skills/unblocked-context-get-urls/) | Retrieve URL content using the CLI or MCP |
| [unblocked-tools-guide](skills/unblocked-tools-guide/) | Choose between CLI commands and MCP tools, and handle unavailable tools |

## Setup

### Unblocked CLI installer

On macOS and Linux, this command installs the Unblocked CLI, configures supported coding agents, installs skills, and starts OAuth authentication:

```bash
curl -fsSL https://getunblocked.com/install-mcp.sh | bash
```

See the [MCP setup guide](https://docs.getunblocked.com/unblocked-mcp/mcp-overview) for supported clients and platform instructions.

### Claude plugin

Connect this repository as a plugin directly in Claude Code:

```bash
claude plugin marketplace add unblocked/skills
claude plugin install unblocked-skills
```

### Using the Skills CLI

```bash
bunx skills add unblocked/skills
```

### Manual copy

Copy the skill directory into your agent's skills folder. Replace `<skill-name>` with a directory such as `unblocked-context-research` or `unblocked-context-get-urls`:

```bash
# Claude Code
cp -r skills/<skill-name> ~/.claude/skills/

# Cursor
cp -r skills/<skill-name> .cursor/skills/
```

## Documentation and support

- [Unblocked MCP product overview](https://getunblocked.com/unblocked-mcp/)
- [Product documentation](https://docs.getunblocked.com/what-is-unblocked)
- [Contact Unblocked support](https://getunblocked.com/dashboard?showIntercom=true)
