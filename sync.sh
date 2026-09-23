#!/usr/bin/env bash
set -euo pipefail

repo_dir=${1:?Usage: sync.sh REPO_DIR REMOTE_URL BRANCH}
remote_url=${2:?Missing remote URL}
branch=${3:?Missing branch}
mkdir -p -- "$(dirname -- "$repo_dir")"
exec 9>"$repo_dir.sync.lock"
flock -n 9 || exit 0
export GIT_TERMINAL_PROMPT=0

if [[ ! -e "$repo_dir" ]]; then
  git clone --single-branch --branch "$branch" -- "$remote_url" "$repo_dir"
fi
cd -- "$repo_dir"
if [[ $(git rev-parse --show-toplevel) != "$repo_dir" ||
      $(git remote get-url origin) != "$remote_url" ||
      $(git symbolic-ref --short HEAD) != "$branch" ]]; then
  printf 'Unexpected checkout; refusing to sync.\n' >&2
  exit 1
fi
if [[ -n $(git status --porcelain --untracked-files=all) ]]; then
  printf 'Local changes found; refusing to sync.\n' >&2
  exit 1
fi
git fetch --no-tags origin "refs/heads/$branch"
if ! git merge-base --is-ancestor HEAD FETCH_HEAD; then
  printf 'Local history diverged or remote was rewritten; refusing to sync.\n' >&2
  exit 1
fi
git merge --ff-only FETCH_HEAD
# Run even without new commits so a previously interrupted install can retry.
bash "$repo_dir/install.sh"

# Only remove obsolete links owned by this dedicated checkout.
for target_dir in "${CODEX_HOME:-$HOME/.codex}/skills" "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills"; do
  for target in "$target_dir"/*; do
    [[ -L "$target" ]] || continue
    source="$repo_dir/skills/$(basename -- "$target")"
    if [[ $(readlink -- "$target") == "$source" && ! -f "$source/SKILL.md" ]]; then
      rm -- "$target"
      printf 'Removed obsolete skill link: %s\n' "$target"
    fi
  done
done
