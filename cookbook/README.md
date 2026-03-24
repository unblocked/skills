# Cookbook

Recipes that compose [Unblocked skills](../skills/) for specific scenarios. Unlike skills in `skills/`, recipes are meant to be **forked and customized** for your environment before production use.

## How to Use

1. Browse the recipes below
2. Copy the recipe directory into your project's `.claude/skills/` (or your agent's skill folder)
3. Adjust the workflow to fit your team's tools, conventions, and constraints
4. Update any reference file paths to match your project structure
5. Iterate on the gotchas section as you discover new failure modes

## Available Recipes

| Recipe | Description |
|--------|-------------|
| [headless-workflow](headless-workflow/) | Autonomous coding workflow for headless/background agents — `research_task` hydration, autonomous review gates, no user checkpoints |
