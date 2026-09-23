#!/usr/bin/env bash
set -euo pipefail

repo_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
sync_dir="$HOME/.local/share/agent-setting"
unit_dir="$HOME/.config/systemd/user"
for command in git flock python3 systemctl; do
  command -v "$command" >/dev/null
done
systemctl --user show-environment >/dev/null
mkdir -p -- "$sync_dir" "$unit_dir"
install -m 755 "$repo_dir/sync.sh" "$sync_dir/sync.sh"

python3 - "$unit_dir" <<'PY'
import json
import os
import pathlib
import sys

units = pathlib.Path(sys.argv[1])
environment = []
for key in ("CODEX_HOME", "CLAUDE_CONFIG_DIR"):
    value = os.environ.get(key)
    if value:
        if not os.path.isabs(value) or "\n" in value:
            raise SystemExit(f"{key} must be an absolute, single-line path")
        environment.append("Environment=" + json.dumps(f"{key}={value}".replace("%", "%%")))
(units / "agent-setting-sync.service").write_text("""[Unit]
Description=Sync personal agent settings from GitHub

[Service]
Type=oneshot
ExecStart=/usr/bin/bash "%h/.local/share/agent-setting/sync.sh" "%h/.local/share/agent-setting/repo" https://github.com/luum-inc/agent-setting.git main
TimeoutStartSec=120
""" + "\n".join(environment) + "\n")
(units / "agent-setting-sync.timer").write_text("""[Unit]
Description=Check for agent settings updates every minute

[Timer]
OnStartupSec=15s
OnUnitInactiveSec=60s
AccuracySec=5s

[Install]
WantedBy=timers.target
""")
PY

systemctl --user daemon-reload
systemctl --user start agent-setting-sync.service
systemctl --user enable --now agent-setting-sync.timer
printf 'Auto sync enabled. For syncing after logout: loginctl enable-linger %s\n' "$(id -un)"
