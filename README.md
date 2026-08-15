# Personal agent settings

Claude Code と Codex で使う個人設定のベースです。

## 構成

```text
.
├── claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── safety.md
│       └── workflow.md
├── codex/
│   └── AGENTS.md
└── skills/
    └── verify-work/
        └── SKILL.md
```

- `claude/CLAUDE.md`: Claude Code の個人向け常設指示
- `claude/rules/*.md`: Claude Code の指示をテーマ別に分割したもの
- `codex/AGENTS.md`: Codex の個人向け常設指示
- `skills/*/SKILL.md`: 両方で再利用するワークフロー

## 導入先

内容を確認してから、次の場所へコピーまたはシンボリックリンクします。

| 対象 | このリポジトリ | 導入先 |
|---|---|---|
| Claude 共通指示 | `claude/CLAUDE.md` | `~/.claude/CLAUDE.md` |
| Claude ルール | `claude/rules/` | `~/.claude/rules/` |
| Codex 共通指示 | `codex/AGENTS.md` | `~/.codex/AGENTS.md` |
| Claude Skill | `skills/verify-work/` | `~/.claude/skills/verify-work/` |
| Codex Skill | `skills/verify-work/` | `~/.codex/skills/verify-work/` |

このリポジトリは設定の原本として扱います。ホームディレクトリへ反映する前に、各ファイルの `Customize` セクションを自分用に編集してください。

## 育て方

- 毎回必要な短い方針は `CLAUDE.md` / `AGENTS.md` に追加する
- Claude固有の細かなルールは `claude/rules/` に追加する
- 複数手順の作業や、必要なときだけ使う手順はSkillにする
- プロジェクト固有のルールは、この個人設定ではなく各プロジェクト側に置く
- 同じ指示を増やしすぎず、曖昧な表現を具体的な行動へ書き換える

