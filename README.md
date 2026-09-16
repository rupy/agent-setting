# Personal agent settings

Claude Code と Codex で使う個人設定のベースです。

## 構成

```text
.
├── shared/
│   └── INSTRUCTIONS.md
├── claude/
│   ├── CLAUDE.md -> ../shared/INSTRUCTIONS.md
│   └── rules/
│       ├── safety.md
│       └── workflow.md
├── codex/
│   └── AGENTS.md -> ../shared/INSTRUCTIONS.md
└── skills/
    ├── create-requirements-docs/
    │   ├── SKILL.md
    │   ├── references/
    │   └── assets/
    │       ├── requirements-template/
    │       └── planning-template/
    └── verify-work/
        └── SKILL.md
```

- **共通指示の原本**: `shared/INSTRUCTIONS.md`
- **Claude共通指示**: `claude/CLAUDE.md`から共通指示の原本を参照
- **Claude分割ルール**: `claude/rules/*.md`
- **Codex共通指示**: `codex/AGENTS.md`から共通指示の原本を参照
- **共通ワークフロー**: `skills/*/SKILL.md`
- **要件定義文書の作成**: `skills/create-requirements-docs/`

## 導入先

内容を確認してから、次の場所へコピーまたはシンボリックリンクします。

| 対象 | このリポジトリ | 導入先 |
|---|---|---|
| Claude 共通指示 | `claude/CLAUDE.md` | `~/.claude/CLAUDE.md` |
| Claude ルール | `claude/rules/` | `~/.claude/rules/` |
| Codex 共通指示 | `codex/AGENTS.md` | `~/.codex/AGENTS.md` |
| Claude Skill | `skills/*/` | `~/.claude/skills/*/` |
| Codex Skill | `skills/*/` | `~/.codex/skills/*/` |

このリポジトリは設定の原本として扱います。ホームディレクトリへ反映する前に、`shared/INSTRUCTIONS.md` の `Customize` セクションを自分用に編集してください。

### このパソコンへの導入状況

`orca` ユーザーの共通指示を、次のシンボリックリンクで導入済みです。

| 導入先 | リンク先（このリポジトリ内） |
|---|---|
| `~/.codex/AGENTS.md` | `codex/AGENTS.md` → `shared/INSTRUCTIONS.md` |
| `~/.claude/CLAUDE.md` | `claude/CLAUDE.md` → `shared/INSTRUCTIONS.md` |
| `~/.claude/rules/safety.md` | `claude/rules/safety.md` |
| `~/.claude/rules/workflow.md` | `claude/rules/workflow.md` |

共通指示は `shared/INSTRUCTIONS.md` を編集すると両方に反映されます。変更後は新しいセッションを開始してください。この設定は同じユーザーで起動するローカルの Codex / Claude Code の全プロジェクトが対象です。各プロジェクトの指示も併せて読み込まれます。

リンク先は `/home/orca/orca/projects/agent-setting` です。このリポジトリを移動・削除する場合はリンクの更新が必要です。`CODEX_HOME` や `CLAUDE_CONFIG_DIR` を変更して起動する場合は、その設定先にも配置してください。Codex に `AGENTS.override.md` を置くと、同じ階層の `AGENTS.md` より優先されます。

今回導入したのは共通指示と Claude の分割ルールです。上表の Skill は別途導入する構成です。

読み込み仕様: [Codex の AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)、[Claude Code の CLAUDE.md](https://code.claude.com/docs/en/memory)。

## 育て方

- **常設方針**: 毎回必要な短い方針は `shared/INSTRUCTIONS.md` に追加する
- **Claude固有ルール**: 細かなルールは `claude/rules/` に追加する
- **複数手順**: 必要なときだけ使う手順はSkillにする
- **プロジェクト固有**: この個人設定ではなく各プロジェクト側に置く
- **明確さ**: 同じ指示を増やしすぎず、曖昧な表現を具体的な行動へ書き換える
