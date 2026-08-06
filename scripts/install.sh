#!/usr/bin/env bash
# Install chrome-web-store-asset-generator skill via symlink.
# Usage: ./scripts/install.sh [target]
# Targets: cursor | claude | codex | agents | all | cursor-project | agents-project

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL_SRC="$REPO_ROOT/skills/chrome-web-store-asset-generator"
SKILL_NAME="chrome-web-store-asset-generator"

if [[ ! -f "$SKILL_SRC/SKILL.md" ]]; then
  echo "error: SKILL.md not found at $SKILL_SRC" >&2
  exit 1
fi

link_skill() {
  local dest_dir="$1"
  mkdir -p "$dest_dir"
  local dest="$dest_dir/$SKILL_NAME"
  ln -sfn "$SKILL_SRC" "$dest"
  echo "linked → $dest"
}

TARGET="${1:-all}"

case "$TARGET" in
  cursor)
    link_skill "$HOME/.cursor/skills"
    ;;
  claude)
    link_skill "$HOME/.claude/skills"
    ;;
  codex)
    link_skill "$HOME/.codex/skills"
    ;;
  agents)
    link_skill "$HOME/.agents/skills"
    ;;
  cursor-project)
    link_skill "$(pwd)/.cursor/skills"
    ;;
  agents-project)
    link_skill "$(pwd)/.agents/skills"
    ;;
  all)
    link_skill "$HOME/.cursor/skills"
    link_skill "$HOME/.claude/skills"
    link_skill "$HOME/.codex/skills"
    link_skill "$HOME/.agents/skills"
    ;;
  *)
    echo "usage: $0 {cursor|claude|codex|agents|all|cursor-project|agents-project}" >&2
    exit 1
    ;;
esac

echo "done — invoke with /chrome-web-store-asset-generator in your agent"
