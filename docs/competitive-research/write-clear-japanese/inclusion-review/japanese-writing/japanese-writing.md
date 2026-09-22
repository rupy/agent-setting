# japanese-writing の採否検討

調査対象: [japanese-writing](https://github.com/ultimatile/dotfiles/blob/main/.claude/skills/japanese-writing/SKILL.md)  
調査記録: [japanese-writing-skills-research.md](../../japanese-writing-skills-research.md)  
[照合先: write-clear-japanese](../../../../../skills/write-clear-japanese/SKILL.md)

## 調査で確認した内容

- 対象と方法: 修辞の抑制、語格・用語の一貫性、引用符などを点検。プロジェクト固有の表記は現地のガイドや用語集に委ねる。
- 参考になる点: 共通の文章規則と、案件ごとの用語・書式を分ける設計。既存の textlint 設定があれば利用する。
- 適用上の注意: 他スキルへの依存や、毎回の確認手順は、このリポジトリの運用に合わせて簡素化する。

## スキルに含める項目リスト

| 項目 | 判断 | 理由と入れる内容 |
| --- | --- | --- |
| 案件の用語集と既定書式を優先する | 既存で対応 | 依頼された用語・構成を優先する。 |
| 引用符や表記の細則を共通化する | 保留 | 案件ごとのスタイルガイドに置く方が適切。 |

## 結論

この対象から現行スキルへ直ちに追加する項目はない。条件付き・保留の項目は、実文書で不足が確認された場合に再検討する。この判断は調査記録と現行スキルの照合であり、対象スキルを導入して出力品質を比較した結果ではない。
