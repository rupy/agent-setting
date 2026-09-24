# `write-clear-japanese` に関する調査結果の統合リスト

[公開スキル40件](.)と[スキル以外の資料31件](non-skills/)の採否検討を、内容が重なるものは一項目にまとめた。判断は[現行スキル](../../../../skills/write-clear-japanese/SKILL.md)との照合に基づく。「既存で対応」は追加不要、「追加候補」は本文への追加を検討、「条件付き」は該当する文書や実例がある場合に扱うことを指す。元資料の効果を新たに実測した一覧ではない。

2026-09-23に [natural-japanese](japanese-writing/natural-japanese.md) の採否を追加した。既存項目の判断を全面的に見直したものではなく、「追加候補」は現在も未反映であることを保証しない。追加対象では付属テスト等を実行したが、文章品質の比較実験は行っていない。条件と結果は[個別調査](../natural-japanese-research.md)を参照。

## スキル本文に入れる内容

| 統合した項目 | 判断 | 具体的な扱い | 主な根拠 |
| --- | --- | --- | --- |
| 読者、目的、読後の判断・行動を先に決める | 既存で対応 | 必要な情報を選ぶ基準にする。短くする前に欠落を確認する。 | [GOV.UK の利用者ニーズ](non-skills/govuk-user-needs.md)、[doc-coauthoring](cognitive-load/doc-coauthoring.md) |
| 用途、読者の知識、指定文体・構成に合わせる | 既存で対応 | 専門家向けの正確な語や、案件の書式を尊重する。 | [文化庁の指針](non-skills/bunka-official-writing.md)、[writing-style](japanese-writing/writing-style.md) |
| 元資料の意味、条件、例外、責任主体、不確実性を保つ | 既存で対応 | 平易化や短文化で判断に必要な情報を落とさない。 | [plain-language](cognitive-load/plain-language.md)、[文化庁の指針](non-skills/bunka-official-writing.md) |
| 根拠のない数値・事例を作らず、事実と推論を分ける | 既存で対応 | 真偽が必要なときは元資料を確認する。 | [antislop-copywriting](ai-slop/antislop-copywriting.md)、[logic-jp-check](japanese-writing/logic-jp-check.md) |
| 主張、根拠、比較軸、因果のつながりを示す | 既存で対応 | 接続詞だけで論理の飛躍を埋めない。 | [logic-jp-check](japanese-writing/logic-jp-check.md)、[anti-slop-writing](ai-slop/anti-slop-writing.md) |
| 段落を話題ごとに分け、結論を探しやすい位置に置く | 既存で対応 | 報告や判断資料では結論を早めに示し、説明文では必要な前提を先に置く。 | [Google の段落ガイド](non-skills/google-paragraph-structure.md)、[technical-writing-guide](cognitive-load/technical-writing-guide.md) |
| 見出しを内容と読者の問いに対応させる | 既存で対応 | 「概要」などだけに頼らず、見出しから内容を予測できるようにする。 | [見出しの研究](non-skills/headings-reading-experiment.md)、[W3C](non-skills/w3c-clear-content.md) |
| 指示先、主体、操作順を曖昧にしない | 既存で対応 | 誤解が生じる箇所で対象名や責任主体を補う。 | [Google の技術文書ガイド](non-skills/google-style-highlights.md)、[stop-ai-slop-jp](ai-slop/stop-ai-slop-jp.md) |
| 必要な専門語を説明し、以後の用語をそろえる | 既存で対応 | 読者が知る語まで毎回定義しない。 | [W3C の文章指針](non-skills/w3c-writing-tips.md)、[plain-language](cognitive-load/plain-language.md) |
| 不自然な直訳、空疎な装飾、重複を用途に照らして直す | 既存で対応 | 語句や対句だけで自動的に欠陥と決めない。 | [japanese-tech-writing](japanese-writing/japanese-tech-writing.md)、[remove-ai-slop](ai-slop/remove-ai-slop.md) |
| 原文の声と意図的な表現を残す | 既存で対応 | 形式やブランドの声が指定される場合も尊重し、過剰に均質化しない。 | [anti-slop（elithrar）](ai-slop/anti-slop-elithrar.md)、[antislop-copywriting](ai-slop/antislop-copywriting.md) |
| 完成稿を先に示し、判断が必要な点だけ伝える | 既存で対応 | 推敲依頼では問題のない項目を列挙しない。 | [日本語ライティング系スキル調査](../japanese-writing-skills-research.md)、[jp-style-check](japanese-writing/jp-style-check.md) |
| 明確な欠陥と文体上の好みを分ける | 追加候補 | レビュー時の過剰修正を防ぐ一文を検討する。 | [jp-style-check](japanese-writing/jp-style-check.md)、[anti-ai-slop](ai-slop/anti-ai-slop.md) |
| 解説・教材では、新しい概念の前に必要な前提を置く | 追加候補 | 初出用語の説明に加え、概念の依存順を確認する。 | [writing-beats](cognitive-load/writing-beats.md)、[writing-shape](cognitive-load/writing-shape.md)、[読解研究](non-skills/working-memory-reading.md) |
| 手順には適用条件、操作、期待結果を近くに置く | 追加候補 | 作業手順を書く場合だけ、成功状態を読者が確認できるようにする。 | [docs-writer](cognitive-load/docs-writer-prisma.md)、[docs-writing](cognitive-load/docs-writing.md) |
| 手順には起こりやすい失敗と対処を添える | 追加候補 | 実際に失敗が起き得る操作で、対処をその操作の近くに置く。 | [docs-writer](cognitive-load/docs-writer-prisma.md)、[plain-language-design](cognitive-load/plain-language-design.md) |
| 見出しと段落先頭だけで説明の流れを確認する | 追加候補 | 長い説明文や報告書で前提の抜けを見落とす場合に、全文通読を補う方法として試す。見出しや段落先頭の文型は固定しない。 | [natural-japanese](japanese-writing/natural-japanese.md) |

## 文書の種類や案件に応じて扱う内容

| 統合した項目 | 判断 | 適用する場面・置き場所 | 主な根拠 |
| --- | --- | --- | --- |
| 文書種別に合わせて手順・参照・解説の構成を選ぶ | 条件付き | 構成の取り違えが実文書で見つかった場合にスキルへ短く補う。分類によるファイル分割は強制しない。 | [Diátaxis](non-skills/diataxis.md)、[docs-writing](cognitive-load/docs-writing.md) |
| レビュー指摘を「箇所・読者への影響・修正案」で示す | 条件付き | 完成稿ではなくレビューを求められたときの出力形式として検討する。 | [anti-ai-slop](ai-slop/anti-ai-slop.md)、[jp-style-check](japanese-writing/jp-style-check.md) |
| 数値に対象、定義、比較基準、条件、確実性を添える | 条件付き | 数値を使う分析・判断資料で欠落が起きる場合に補う。 | [不確実性の試験](non-skills/uncertainty-expression-trial.md)、[build-report](cognitive-load/build-report-openai.md) |
| 例・図・表を本文の説明と対応付ける | 条件付き | 図解や教材で参照箇所が曖昧なときに補う。図の追加自体を義務にしない。 | [図と文章のメタ分析](non-skills/diagram-cues-meta-analysis.md)、[writing-shape](cognitive-load/writing-shape.md) |
| 一般向け文書では媒体と前提知識に合わせて説明量を選ぶ | 条件付き | 対象読者が広く、説明不足の実例がある場合に補う。 | [文化庁の指針](non-skills/bunka-official-writing.md)、[plain-language](cognitive-load/plain-language.md) |
| 読者による探索・理解・実行を試す | 案件の検証で扱う | 影響の大きい文書や実際の読者がいる案件で検証計画に入れる。好みと理解度を分ける。 | [文書テンプレート研究](non-skills/document-template-user-test.md)、[Easy Read の試験](non-skills/easy-read-trial.md)、[視覚要素の試験](non-skills/visual-elements-trial.md) |
| 用語集、表記ガイド、textlint を使う | 案件別に扱う | 表記ゆれが反復する場合に選ぶ。警告は文意と照合する。 | [JTF](non-skills/jtf-styleguide.md)、[textlint](non-skills/textlint-technical-writing.md)、[ja-proofreading](japanese-writing/ja-proofreading.md) |
| 用語候補の抽出、指摘の仕分け、修正後の指摘比較を使う | 条件付き | 長い文書や繰り返し推敲で見落としが起きる場合の補助検査。指摘件数とは別に、意味や未確定事項を保てたか確認する。 | [natural-japanese](japanese-writing/natural-japanese.md) |
| HTML のリンク名、ラベル、エラー文を確認する | 別の検証で扱う | 画面状態と操作を含む Web・UI 文書の検証に置く。 | [デジタル庁のリンク指針](non-skills/digital-agency-link-text.md)、[accessible-content](cognitive-load/accessible-content.md) |
| 複数ページの分類、目次、ナビゲーションを確認する | 別の検証で扱う | 文書群の情報設計で読者の探索課題を試す。 | [information-architecture](cognitive-load/information-architecture.md)、[文書テンプレート研究](non-skills/document-template-user-test.md) |
| 文字サイズ、行間、余白などを実表示で確認する | 別の検証で扱う | HTML や印刷物の視覚検証に置く。 | [デジタル庁のタイポグラフィ](non-skills/digital-agency-typography.md)、[Gesso anti-slop](ai-slop/gesso-anti-slop.md) |
| スキル・指示文書の入口、参照条件、動作確認を設計する | 別のスキルで扱う | エージェント向け指示の作成・改訂時に適用する。 | [writing-for-agents](cognitive-load/writing-for-agents.md)、[writing-skills](cognitive-load/writing-skills-superpowers.md) |
| 日本語の問題例と反例を蓄積する | 保留 | 同じ失敗が繰り返されたときに、長い禁止語集ではなく実例で規則の必要性を判断する。 | [stop-ai-slop-jp](ai-slop/stop-ai-slop-jp.md)、[anti-slop（kjmagnan1s）](ai-slop/anti-slop-kjmagnan1s.md) |

## 共通して採用しない規則

- 自然度の点数、自己評価の固定点、lint の指摘0件を、意味の正しさや読者の理解の保証にする。[natural-japanese](japanese-writing/natural-japanese.md)
- 文長、語数、見出し数、読解水準、秒数を普遍的な合格値にする。[Sweller (1988)](non-skills/sweller-1988.md)、[見出しの研究](non-skills/headings-reading-experiment.md)、[ux-writing](cognitive-load/ux-writing.md)
- 専門語、対句、主語省略、特定語、句読点を一律に禁止する。[W3C の文章指針](non-skills/w3c-writing-tips.md)、[remove-ai-slop](ai-slop/remove-ai-slop.md)、[stop-ai-slop-jp](ai-slop/stop-ai-slop-jp.md)
- 平易化、短文化、図や視覚要素の追加だけで理解が改善すると断定する。[平易な健康情報の試験](non-skills/plain-health-2024.md)、[視覚要素の試験](non-skills/visual-elements-trial.md)、[図と文章のメタ分析](non-skills/diagram-cues-meta-analysis.md)
- 公用文、翻訳、README、記事、UI、報告書の固有形式を全文章に強制する。[JTF](non-skills/jtf-styleguide.md)、[crafting-effective-readmes](cognitive-load/crafting-effective-readmes.md)、[build-report](cognitive-load/build-report-openai.md)
- コード作成、UI の視覚設計、発散的推論を日本語文章スキルへ取り込む。[ponytail](cognitive-load/ponytail.md)、[anti-slop-design](ai-slop/anti-slop-design-hu553in.md)、[adhd](cognitive-load/adhd.md)

この一覧は、個別資料の採否を統合した判断用の索引である。各資料の対象範囲と留保はリンク先の個別文書と元の調査記録で確認する。
