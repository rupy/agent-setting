#!/usr/bin/env bash
set -euo pipefail

# Run as the account that will use these settings, including over SSH.
repo_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
codex_dir=${CODEX_HOME:-"$HOME/.codex"}
claude_dir=${CLAUDE_CONFIG_DIR:-"$HOME/.claude"}
backup_dir=

link_setting() {
  local source=$1 target=$2
  if [[ -L "$target" && $(readlink -- "$target") == "$source" ]]; then
    printf 'Already installed: %s\n' "$target"
    return
  fi
  mkdir -p -- "$(dirname -- "$target")"
  if [[ -e "$target" || -L "$target" ]]; then
    if [[ -z "$backup_dir" ]]; then
      mkdir -p -- "$HOME/.local/state/agent-setting"
      backup_dir=$(mktemp -d "$HOME/.local/state/agent-setting/backup.XXXXXXXX")
      printf 'Backup directory: %s\n' "$backup_dir"
    fi
    # Keep each original path to make restoring files and directories explicit.
    mkdir -p -- "$backup_dir$(dirname -- "$target")"
    mv -- "$target" "$backup_dir$target"
  fi
  ln -s -- "$source" "$target"
  printf 'Installed: %s\n' "$target"
}

remove_old_link() {
  local target=$1 old_source=$2
  if [[ -L "$target" && $(readlink -- "$target") == "$old_source" ]]; then
    rm -- "$target"
    printf 'Removed old link: %s\n' "$target"
  fi
}

if [[ "$codex_dir" != /* || "$claude_dir" != /* || "$HOME" != /* ]]; then
  printf 'HOME, CODEX_HOME and CLAUDE_CONFIG_DIR must use absolute paths.\n' >&2
  exit 1
fi

link_setting "$repo_dir/AGENTS.md" "$HOME/AGENTS.md"
link_setting "$repo_dir/AGENTS.md" "$codex_dir/AGENTS.md"
remove_old_link "$claude_dir/CLAUDE.md" "$repo_dir/claude/CLAUDE.md"
for rule in safety workflow; do
  remove_old_link "$claude_dir/rules/$rule.md" "$repo_dir/claude/rules/$rule.md"
done
for skill in "$repo_dir"/skills/*; do
  [[ -f "$skill/SKILL.md" ]] || continue
  link_setting "$skill" "$codex_dir/skills/$(basename -- "$skill")"
  link_setting "$skill" "$claude_dir/skills/$(basename -- "$skill")"
done

if [[ -s "$codex_dir/AGENTS.override.md" ]]; then
  printf 'Note: %s takes precedence over AGENTS.md.\n' "$codex_dir/AGENTS.override.md"
fi
printf 'Installation complete. Start a new Codex / Claude Code session.\n'
