# Personal agent settings

Claude Code と Codex で使う個人設定です。共通指示はリポジトリ直下の `AGENTS.md` にまとめています。

## 構成

- `AGENTS.md`: 両ツールで共有する指示の原本。`Customize` セクションで個人設定を編集します。
- `skills/*/SKILL.md`: 必要なときに使う共通 Skill。
- `requirements-html/`: HTML 要件定義の[閲覧用サイト](requirements-html/index.html)。
- `docs/`: Skill の調査資料。

## 導入

このリポジトリを配置したユーザーで実行します。

```bash
bash install.sh
```

| 導入先 | 内容 |
|---|---|
| `~/AGENTS.md` | Claude Code がホームから各プロジェクトへの階層で読む共通指示 |
| `${CODEX_HOME:-~/.codex}/AGENTS.md` | Codex のユーザー共通指示 |
| `${CODEX_HOME:-~/.codex}/skills/*` | Codex 用 Skill |
| `${CLAUDE_CONFIG_DIR:-~/.claude}/skills/*` | Claude Code 用 Skill |

すべてリポジトリ内へのシンボリックリンクです。既存の同名ファイルは `~/.local/state/agent-setting/backup.*` に退避します。同じリンクがあればそのままにします。以前のこのリポジトリへの `~/.claude/CLAUDE.md` と `~/.claude/rules/{safety,workflow}.md` のリンクだけを削除します。独自のファイルやリンクは削除しません。反映後は新しいセッションを開始してください。

`CODEX_HOME` と `CLAUDE_CONFIG_DIR` を設定している場合は、絶対パスを指定してください。Codex に `AGENTS.override.md` がある場合は、同じ階層の `AGENTS.md` より優先されます。

## VPS での自動更新

GitHub の `main` を約1分ごとに取得し、共通指示と Skill の追加・変更・削除を自動反映できます。

```bash
bash install-auto-sync.sh
loginctl enable-linger "$(id -un)"
```

ユーザー用 systemd timer を使用します。`enable-linger` はログアウト後・VPS 再起動後も同期を継続するための設定です。環境によって管理者権限が必要です。

同期先は `~/.local/share/agent-setting/repo` です。設定のリンクはこの専用コピーを参照し、開発用リポジトリは変更しません。初回に既存設定と衝突した場合は、通常の導入と同じバックアップを作成します。専用コピーに未コミットの変更・独自コミットがある場合や、リモートの履歴が書き換わった場合は同期を停止します。取得に失敗した場合は次の実行で再試行します。

同期時には取得した `install.sh` をユーザー権限で実行するため、`main` には信頼できる変更だけを取り込んでください。削除された Skill は専用コピーを参照するリンクだけを削除します。`CODEX_HOME` / `CLAUDE_CONFIG_DIR` の指定は導入時にサービスへ保存します。同期プログラムや timer 自体を更新するときは `install-auto-sync.sh` を再実行してください。

```bash
# 状態・ログ
systemctl --user status agent-setting-sync.timer
journalctl --user -u agent-setting-sync.service -n 50
# 今すぐ同期
systemctl --user start agent-setting-sync.service
# 自動更新を停止（現在の設定は維持）
systemctl --user disable --now agent-setting-sync.timer
```

反映後は新しいエージェントのセッションを開始してください。[Codex の公式ドキュメント](https://learn.chatgpt.com/docs/agent-configuration/agents-md)では、指示はセッション開始時に読み込まれます。

## Claude Code での読み込み条件

[Claude Code の公式ドキュメント](https://code.claude.com/docs/en/memory#agentsmd)によると、`AGENTS.md` の直接読み込みには v2.1.277 以降が必要です。作業ディレクトリまたはその親に `CLAUDE.md` / `CLAUDE.local.md` がある場合、既定ではそちらが優先されます。Bedrock などの外部プロバイダーやテレメトリー無効化などで機能が使えないセッションもあります。その場合は必要な場所に `CLAUDE.md` を作り、`@AGENTS.md` で読み込んでください。Claude Code のセッション開始時に `AGENTS.md loaded` と表示されるか確認できます。

Claude Code の Skill は引き続き `~/.claude/skills/` に、Codex の Skill は `~/.codex/skills/` にリンクします。指示の原本だけを一本化しています。
