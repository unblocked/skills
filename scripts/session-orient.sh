#!/bin/bash
# session-orient.sh — SessionStart hook script
#
# Runs at session start to provide lightweight context about the current repo
# and branch. Must complete in <15 seconds. Full context hydration remains
# the unblock skill's job — this just provides orientation.

set -euo pipefail

# Detect if we're in a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo '{"additionalContext": "Not in a git repository. Unblocked context loading skipped."}'
  exit 0
fi

REPO_NAME=$(basename "$(git rev-parse --show-toplevel)")
BRANCH=$(git branch --show-current 2>/dev/null || echo "detached")
RECENT_COMMITS=$(git log --oneline -5 2>/dev/null || echo "none")

# Check for uncommitted changes
if git diff --quiet && git diff --cached --quiet; then
  DIRTY="clean"
else
  DIRTY="has uncommitted changes"
fi

# Check for handoff documents from previous sessions
HANDOFF_DIR=".claude/handoffs"
LATEST_HANDOFF=""
if [ -d "$HANDOFF_DIR" ]; then
  LATEST_HANDOFF=$(ls -t "$HANDOFF_DIR"/*.md 2>/dev/null | head -1 || true)
fi

# Build context summary
CONTEXT="Session context for ${REPO_NAME} (branch: ${BRANCH}, ${DIRTY})."
CONTEXT="${CONTEXT}\n\nRecent commits:\n${RECENT_COMMITS}"

if [ -n "$LATEST_HANDOFF" ]; then
  HANDOFF_CONTENT=$(head -50 "$LATEST_HANDOFF" 2>/dev/null || true)
  CONTEXT="${CONTEXT}\n\nHandoff from previous session found (${LATEST_HANDOFF}):\n${HANDOFF_CONTENT}"
  CONTEXT="${CONTEXT}\n\nA previous session left a handoff document. Review it to continue where they left off."
fi

# Output as JSON for Claude Code hook consumption
# Using printf to handle newlines properly in JSON
ESCAPED_CONTEXT=$(echo -e "$CONTEXT" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null || echo "\"${CONTEXT}\"")

echo "{\"additionalContext\": ${ESCAPED_CONTEXT}}"
