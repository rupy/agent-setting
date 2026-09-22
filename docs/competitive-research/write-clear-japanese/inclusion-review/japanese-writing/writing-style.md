# writing-style の採否検討

調査対象: [writing-style](https://github.com/takekazuomi/takekazuomi-claude-plugins/blob/main/plugins/writing-style/skills/writing-style/SKILL.md)  
調査記録: [japanese-writing-skills-research.md](../../japanese-writing-skills-research.md)  
[照合先: write-clear-japanese](../../../../../skills/write-clear-japanese/SKILL.md)

## 調査で確認した内容

- 対象と方法: ブログ等は casual、仕様書・設計書等は formal と文書種別で切り替える。執筆後に削除、論理、通読、文字数、任意の textlint を確認する。
- 参考になる点: 同じ「良い日本語」でも用途ごとに文体と情報密度を変える。機械検査を論理検査の代わりにしない。
- 適用上の注意: スタイルの二分法や著者固有の好みは、そのまま共通規則にしない。

## スキルに含める項目リスト

| 項目 | 判断 | 理由と入れる内容 |
| --- | --- | --- |
| 用途に応じて文体と情報密度を選ぶ | 既存で対応 | 目的、文体、長さを依頼から決める。 |
| 執筆後に論理と表記を別々に点検する | 条件付き | 案件で表記ゆれが反復する場合にツールを検討する。 |
| casual/formal の二分法を強制する | 見送る | 文書の種類を十分に表せない。 |

## 結論

この対象から現行スキルへ直ちに追加する項目はない。条件付き・保留の項目は、実文書で不足が確認された場合に再検討する。この判断は調査記録と現行スキルの照合であり、対象スキルを導入して出力品質を比較した結果ではない。
