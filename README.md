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

## Claude Code での読み込み条件

[Claude Code の公式ドキュメント](https://code.claude.com/docs/en/memory#agentsmd)によると、`AGENTS.md` の直接読み込みには v2.1.277 以降が必要です。作業ディレクトリまたはその親に `CLAUDE.md` / `CLAUDE.local.md` がある場合、既定ではそちらが優先されます。Bedrock などの外部プロバイダーやテレメトリー無効化などで機能が使えないセッションもあります。その場合は必要な場所に `CLAUDE.md` を作り、`@AGENTS.md` で読み込んでください。Claude Code のセッション開始時に `AGENTS.md loaded` と表示されるか確認できます。

Claude Code の Skill は引き続き `~/.claude/skills/` に、Codex の Skill は `~/.codex/skills/` にリンクします。指示の原本だけを一本化しています。
