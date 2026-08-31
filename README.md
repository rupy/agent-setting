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

## 育て方

- **常設方針**: 毎回必要な短い方針は `shared/INSTRUCTIONS.md` に追加する
- **Claude固有ルール**: 細かなルールは `claude/rules/` に追加する
- **複数手順**: 必要なときだけ使う手順はSkillにする
- **プロジェクト固有**: この個人設定ではなく各プロジェクト側に置く
- **明確さ**: 同じ指示を増やしすぎず、曖昧な表現を具体的な行動へ書き換える
