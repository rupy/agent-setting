# AI slop 対策スキルの調査

調査日: 2026-09-22

## 調査の範囲

公開リポジトリの `SKILL.md` と公式 README を確認した。ここでいう AI slop は、生成元の判定ではなく、用途に対して抽象的、定型的、根拠不足、または装飾過多になった成果物の問題を指す。公開スキルの主張や効果は、独立した性能検証として扱わない。

## 主なスキル

| スキル | 対象と方法 | 参考になる点 | このリポジトリでの扱い |
| --- | --- | --- | --- |
| [anti-slop-writing](https://github.com/adewale/anti-slop-writing/blob/main/skills/anti-slop-writing/SKILL.md) | 記事、README、発表原稿などの文章。誇張より具体的な根拠を重視し、段落間の因果や依存関係も点検する。 | 言葉遣いだけでなく、主張を支える事実と文章の流れを見る。必要な場合だけ詳細リファレンスを読む構成。 | 日本語スキルの推敲観点として有用。英語の表層パターンは直輸入しない。 |
| [antislop-copywriting](https://github.com/miqdadbadjuber/anti-slop/blob/main/skills/antislop-copywriting/SKILL.md) | 見出し、CTA、製品説明などのコピー。問題例と修正例を対にして示す。 | 書き換え時に事実、数字、引用を創作しない。元のブランドの声も残す。 | HTML の案内文や製品コピーを作る場合に参考。要件定義文書へマーケティング文体を持ち込まない。 |
| [remove-ai-slop](https://github.com/davidamitchell/Skills/blob/main/remove-ai-slop/SKILL.md) | 平板な文章の編集。定型的な対句、均一なリズム、空疎な導入を点検する。 | 形式が必要な文書や、既に良い文章は過剰に直さないという適用条件。 | 文体の点検項目として参考。禁止語や句読点の一律ルールは採用しない。 |
| [anti-ai-slop](https://github.com/ch040602/anti-ai-slop/blob/main/SKILL.md) | 文章、UI、図、コードなどを横断してレビューする。目的、固有の文脈、成果物の設計を基準にする。 | 見える問題を具体的な箇所と修正案に結び付け、文体だけで AI 使用を断定しない。 | 将来、文章以外も含むレビュー用スキルを作る場合の参考。現行の日本語スキルへ全分野を詰め込まない。 |
| [anti-slop（AgriciDaniel）](https://github.com/AgriciDaniel/anti-slop/blob/main/README.md) | レビュー、書き換え、コード、参照検証を分ける構成。表層の兆候だけで失格にせず、出典や実際の破損を確認する。 | 深刻度と確信度を分ける。修正後の検証を別の段階として扱う。 | 大規模な監査を作る際の参考。通常の文章推敲には構成が重い。 |
| [Gesso anti-slop](https://github.com/Gesso-Build/skills) | 静的 HTML/CSS の見た目を、検出条件のあるルールで点検する。自動修正、判定のみ、参考情報を分ける。 | 自動修正できるものと、人のデザイン判断が必要なものを区別する。 | HTML の視覚レビュー向け。文書本文の品質評価や AI 生成判定には転用しない。 |
| [anti-slop（elithrar）](https://github.com/elithrar/dotfiles/blob/main/.agents/skills/anti-slop/SKILL.md) | 文章の声を残しながら、意味を足さない定型表現を小さく直す。詳細な兆候集は必要なときだけ参照する。 | 意図的な対句や断片は残し、迷う箇所は修正を強制しない。通常の執筆では自動適用しない。 | 現行の文章スキルの適用条件と、過剰修正を防ぐ手順の参考。 |
| [anti-slop（kjmagnan1s）](https://github.com/kjmagnan1s/anti-slop/blob/main/SKILL.md) | 文章の兆候集に加え、実例の蓄積、声の保護リスト、回帰評価を運用する。 | 新しい兆候をすぐ禁止規則にせず、実例と評価を経て採否を決める。 | 日本語の実例を継続収集する段階になれば運用設計の参考。現状では重い。 |
| [stop-ai-slop-jp](https://github.com/iKora128/stop-ai-slop-jp/blob/main/SKILL.md) | 日本語の文章を対象に、書き手の立場、主語、見出しや段落の型、語彙を点検する。 | 表層の記号よりも、誰が何を言うのかを先に確認する。日本語の具体例がある。 | 日本語の事例集として有用。ただし一人称、伝聞表現、見出しの形などを一律に強制する規則は、要件定義や報告文には適用しない。 |
| [anti-slop-design（hu553in）](https://github.com/hu553in/skills/blob/main/anti-slop-design/SKILL.md) | UI の視覚設計とレビュー。製品、実データ、既存のデザイントークンに基づき、画面を表示して確認する。 | マーケティング画面と管理画面で評価軸を変え、改修範囲と既存のデザインを守る。 | 将来の HTML 視覚レビュースキルの参考。文章用には含めない。 |

## 共通して有効な設計

1. **成果物の目的から始める。** 読者が何を判断・実行するかに照らし、抽象的な称賛や飾りだけの文を見つける。文章、UI、コードでは具体性の基準が異なる。[anti-ai-slop](https://github.com/ch040602/anti-ai-slop/blob/main/SKILL.md)、[anti-slop-writing](https://github.com/adewale/anti-slop-writing/blob/main/skills/anti-slop-writing/SKILL.md)
2. **出典にない具体性を作らない。** 具体的にするための架空の数値や導入実績は、むしろ品質を下げる。足りない情報は不足として示す。[antislop-copywriting](https://github.com/miqdadbadjuber/anti-slop/blob/main/skills/antislop-copywriting/SKILL.md)
3. **表層の兆候を判決にしない。** 対句、箇条書き、特定の色やフォントは、用途に合えば残す。問題として挙げるときは、実際の箇所、読者への影響、修正案を示す。[anti-ai-slop](https://github.com/ch040602/anti-ai-slop/blob/main/SKILL.md)、[anti-slop（AgriciDaniel）](https://github.com/AgriciDaniel/anti-slop/blob/main/README.md)
4. **既存の制約を守る。** 定型報告書の構造、指定された文体、ブランドの声、原文の事実関係を維持する。修正のために文章を均質化しない。[remove-ai-slop](https://github.com/davidamitchell/Skills/blob/main/remove-ai-slop/SKILL.md)、[antislop-copywriting](https://github.com/miqdadbadjuber/anti-slop/blob/main/skills/antislop-copywriting/SKILL.md)

## このリポジトリへの適用案

現行の [write-clear-japanese](../../skills/write-clear-japanese/SKILL.md) は、読者、根拠、因果、自然な日本語、過剰な装飾の点検を既に含む。次の改善は、実際の文書で問題が確認されたときに追加するのがよい。

- **文章用の短いレビュー手順**: 指摘箇所、読者に起きる問題、修正案を一組で返す。語句の検出だけで修正を強制しない。
- **日本語固有の事例**: 「重要です」「多角的に」「〜を実現します」などの空疎な使い方を、要件定義や報告文で生じた実例から集める。語句そのものを禁止しない。
- **HTML の視覚品質は別扱い**: レイアウトや色の点検が必要になれば、文章スキルとは別のレビュー手順にする。

今回の調査は設計比較であり、各スキルを導入した場合の出力品質、処理時間、誤検出率は実測していない。導入やスキル改訂を判断する際は、このリポジトリの実際の文章で修正前後を比較する。
