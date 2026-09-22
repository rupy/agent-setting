# build-report（OpenAI） の採否検討

調査対象: [build-report（OpenAI）](https://github.com/openai/role-specific-plugins/blob/main/plugins/data-analytics/skills/build-report/SKILL.md)  
調査記録: [cognitive-load-writing-skills-research.md](../../cognitive-load-writing-skills-research.md)  
[照合先: write-clear-japanese](../../../../../skills/write-clear-japanese/SKILL.md)

## 調査で確認した内容

- 対象と方法: 分析結果を報告書にする skill。最初に問いへの答えを置き、数値の定義・比較基準・根拠・留保・次の判断を対応付ける。
- 参考になる点: 読者が図表だけから意味を推測したり、後ろの節から条件を探したりする負担を減らす。
- 適用上の注意: 分析報告専用。公開リポジトリは 2026-09-16 にアーカイブされており、そのまま導入するより構成上の参考とする。

## スキルに含める項目リスト

| 項目 | 判断 | 理由と入れる内容 |
| --- | --- | --- |
| 問いへの答え、根拠、留保、次の判断を対応付ける | 条件付き | 分析報告では有用。現行の結論位置と根拠の確認を案件に適用する。 |
| 数値の定義と比較基準を示す | 条件付き | 数値を多用する報告で欠落が起きたら指針を補う。 |
| 報告書の型を全文章へ適用する | 見送る | 文章の用途が異なる。 |

## 結論

この対象から現行スキルへ直ちに追加する項目はない。条件付き・保留の項目は、実文書で不足が確認された場合に再検討する。この判断は調査記録と現行スキルの照合であり、対象スキルを導入して出力品質を比較した結果ではない。
