---
name: init-unblocked
description: |
  One-time setup skill for Unblocked.
  Installs the Unblocked CLI via curl, authenticates the user, and configures the MCP server
  so AI coding agents can access PRs, Slack, Jira, and docs. Run this once to get set up.

  MANDATORY TRIGGERS: "try unblocked", "setup unblocked", "install unblocked", "get started with unblocked", "onboard unblocked", "configure unblocked", "init unblocked"
license: MIT
metadata:
  author: Unblocked
  version: 0.1.0-dev
  website: https://getunblocked.com
---

# Init Unblocked — One-Time Setup

This skill runs once to set up Unblocked on your machine: installs the CLI, authenticates your account, and configures the MCP server for your AI coding agent.

> **IMPORTANT — Agent Behavior Contract:**
> Before executing ANY action in this skill (shell commands, opening browsers, modifying config), you MUST:
>
> 1. Tell the user exactly what you are about to do and why
> 2. Wait for the user to acknowledge or approve before proceeding
> 3. Show the result and confirm success before moving to the next step
>
> Never silently execute commands. Every step should feel like a guided conversation.

---

## Step 0: Pre-Flight Check

Before starting, verify the environment:

**Tell the user:** "Before we begin, I'm going to check whether the Unblocked CLI is already installed on your machine, and confirm that prerequisites (curl, bash) are available."

Run these checks and report the results:

1. **Unblocked CLI:** `which unblocked 2>/dev/null && unblocked --version || echo "Unblocked CLI not found"`
2. **Prerequisites:** `which curl && which bash`

**If the Unblocked CLI is already installed:**

- Tell the user: "It looks like the Unblocked CLI is already installed (version X). Let me check if it's also authenticated and the MCP server is configured."
- Run `unblocked help` to discover the auth status / whoami command
- Check authentication status
- If both CLI and auth are in place, skip directly to [Step 4: Verify Setup](#step-4-verify-setup)
- If CLI is installed but not authenticated, skip to [Step 3: Authenticate](#step-3-authenticate-with-unblocked)

**If the Unblocked CLI is NOT installed:**

- Tell the user: "The Unblocked CLI isn't installed yet. I'll walk you through the installation next."
- Proceed to [Step 1: Install the Unblocked CLI](#step-1-install-the-unblocked-cli)

---

## Step 1: Install the Unblocked CLI

**Tell the user:**

> "I'm going to install the Unblocked CLI by running a shell script from dev.getunblocked.com. This will download and configure the `unblocked` command-line tool on your machine. Here's the exact command I'll run:"
>
> ```
> curl -fsSL https://getunblocked.com/install.sh | bash
> ```

**Wait for user acknowledgement before running the command.**

After the command completes:

- Show the user the full output
- Confirm whether the install succeeded or failed
- If it failed, troubleshoot based on the error output before continuing

---

## Step 2: Discover Available Commands

**Tell the user:**

> "Now I'm going to run `unblocked help` to see all the commands available in the CLI. This will help me understand what setup steps are needed."

Run: `unblocked help`

Review the output and identify:

- The authentication/login command
- The MCP configuration command
- Any other setup-related commands

Share a brief summary with the user:

> "Here are the key commands we'll use next: [list the relevant commands you found]"

---

## Step 3: Authenticate with Unblocked

**Tell the user:**

> "I'm going to open a browser session now to login with Unblocked for Authorization. This will open your default browser to the Unblocked login page where you can sign in or create an account. The CLI will wait for the browser authentication to complete."

**Wait for user acknowledgement before opening the browser.**

Run the auth command with the `--skip-prompt` flag so the browser opens immediately without
waiting for interactive input (since we're running from an agent session). For example:

```
unblocked auth --skip-prompt
```

Use whichever auth command you discovered in Step 2, but always append `--skip-prompt`.

After running:

- Let the user know the browser should have opened
- Wait for them to confirm they completed the login
- Check the command output for success/failure
- If authentication failed, help troubleshoot

---

## Step 3b: Configure MCP Server

Based on the commands discovered in Step 2, determine if there is an explicit MCP setup/configuration step.

**Tell the user:**

> "Now I'm going to configure the Unblocked MCP server so your AI coding agent can access your team's context. Here's what I'll run: [exact command]"

**Wait for user acknowledgement before running.**

After running:

- Show the output
- Confirm the MCP server is configured

---

## Step 4: Verify Setup

**Tell the user:**

> "Let me verify everything is set up correctly before we continue. I'm going to run a few checks."

Run these verification checks (reporting each one to the user):

1. **CLI installed:** `unblocked --version`
2. **Authentication valid:** Run the appropriate auth status/whoami command (discovered from `unblocked help`)
3. **MCP server configured:** Check that the MCP tools are accessible by attempting to use one (e.g., `unblocked_context_engine` or similar)

**Report a summary:**

> "Here's your setup status:"
>
> - CLI: [installed / version]
> - Auth: [authenticated as X / not authenticated]
> - MCP: [configured / not configured]

If anything failed, help the user fix it before continuing.

If everything passes, tell the user:

> **You're all set!** Unblocked is installed, authenticated, and your MCP server is configured. Every AI coding agent you use now has access to your team's full context — PRs, Slack discussions, Jira tickets, docs, and code history — all queryable in natural language.
>
> **⚠️ Important: You need to restart your agent session** for the MCP server we just configured to become available. Close this session and start a new one — the Unblocked MCP tools won't be visible to your agent until you do.
>
> **Here's what changes now:** With Unblocked providing context, you can take on much more ambitious work with your AI agent. Instead of small, isolated tasks, you can tackle full features, complex refactors, and cross-system changes — because the agent understands _why_ your code exists, not just _what_ it does.
>
> **Next step: restart your agent session.** Once you're in a fresh session, the Unblocked MCP tools will be available and you can start using the `/unblock` skill by typing commands like:
>
> - `/unblock implement [feature name]`
> - `/unblock refactor [system] to [goal]`
> - `/unblock investigate and fix [bug description]`
>
> The more context Unblocked has about your codebase, the more ambitious you can be. Ask it anything — after you restart!

---

## What You Can Do After Restarting

Once you restart your agent session, Unblocked will be fully active. Your AI agent will have access to your team's full knowledge graph — PRs, Slack threads, Jira tickets, design docs, and code history. This means you can stop scoping work to what the agent can see in your local files and start thinking bigger.

### Use the `/unblock` skill

The `/unblock` skill is your primary workflow. It hydrates your plan with real context from your team's history and uses Unblocked throughout implementation — from planning to code generation to review.

**Example prompts (use these in your new session):**

- `/unblock implement [feature name]`
- `write me a plan for how we can approach [project] with /unblock`
- `/unblock refactor [system] to [goal]`
- `/unblock investigate and fix [bug description]`

### Think Bigger

Without context, AI agents are limited to what they can see in your repo right now. With Unblocked, they know:

- **Why** code was written the way it was — from PR discussions and Slack threads
- **What was tried before** — so you don't repeat failed approaches
- **Who the experts are** — and what they've said about the system
- **What the requirements actually are** — from Jira, Linear, and design docs

This means you can confidently ask your agent to take on full features, cross-system refactors, and complex debugging — not just small isolated edits.

### Resources

- [Unblocked](https://getunblocked.com) - Automated context retrieval for engineering teams
- [Unblocked MCP Docs](https://getunblocked.com/docs/mcp) - Connect Unblocked to your AI coding tools
- [Unblocked API](https://getunblocked.com/docs/api) - Programmatic access to context
