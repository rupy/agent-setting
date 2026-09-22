# writing-for-agents の採否検討

調査対象: [writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)  
調査記録: [cognitive-load-writing-skills-research.md](../../cognitive-load-writing-skills-research.md)  
[照合先: write-clear-japanese](../../../../../skills/write-clear-japanese/SKILL.md)

## 調査で確認した内容

- 対象と方法: Skill、`AGENTS.md`、`CLAUDE.md` など、エージェントが読む文書。手順と参照情報の階層、参照先を開く条件、完了条件を整理する。
- 参考になる点: 常時読む情報と必要時だけ読む情報を分け、エージェントのコンテキスト負荷と、人が参照先を覚える負荷の両方を考える。
- 適用上の注意: 人間向け文書の読解研究とは区別する。このリポジトリの Skill と共通指示を見直す際には直接役立つ。

## スキルに含める項目リスト

| 項目 | 判断 | 理由と入れる内容 |
| --- | --- | --- |
| 指示文書の常時必要な内容と条件付き参照を分ける | 別スキル向け | エージェント向け指示設計の問題であり、日本語文章一般の規則ではない。 |
| 読み手が参照先を探しやすくする | 条件付き | 指示文書を依頼された場合に、参照の入口を確認する。 |

## 結論

この対象から現行スキルへ直ちに追加する項目はない。条件付き・保留の項目は、実文書で不足が確認された場合に再検討する。この判断は調査記録と現行スキルの照合であり、対象スキルを導入して出力品質を比較した結果ではない。
