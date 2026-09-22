# 日本語ライティング系スキルの調査

調査日: 2026-09-22

## 調査の範囲

公開されている `SKILL.md` と、その配布元の README を確認した。日本語の説明文、技術文書、業務文書の作成・推敲に役立つものを対象とする。公開スキルの品質や効果を、このリポジトリの文章で比較実測したものではない。

## 比較

| スキル | 主な用途・方法 | 参考になる点 | 適用時の注意 |
| --- | --- | --- | --- |
| [japanese-tech-writing](https://gist.github.com/k16shikano/fd287c3133457c4fd8f5601d34aa817d) | 技術書・解説文の執筆と推敲。段落、論証、読者の負担、翻訳調の比喩、冗長さを扱う。 | 文の表面だけでなく、主張の根拠や説明順序まで点検する。 | 書籍原稿向けの細かい規則を、短い業務文書へ一律に適用しない。既存の [write-clear-japanese](../../skills/write-clear-japanese/SKILL.md) の発想元でもある。 |
| [jp-style-check](https://github.com/Forest-Project-Lab/jp-writing-skills/blob/main/plugin/skills/jp-style-check/SKILL.md) | 日本語の曖昧さ、冗長さ、訳語臭、用語・表記の不一致を指摘する。美しさを採点せず、問題箇所だけ返す。 | 明確な欠陥と、確信度の低いリズム上の助言を分ける。各規則に誤検出を避ける条件がある。 | 特定の言い回しを見つけただけで欠陥と決めない。文体と読者を先に確認する。 |
| [logic-jp-check](https://github.com/Forest-Project-Lab/jp-writing-skills/blob/main/plugin/skills/logic-jp-check/SKILL.md) | `jp-style-check` の日本語検査に、主張と根拠、推論、比較軸、因果の検査を加える。 | 「文章が読めるか」と「論証が成立するか」を分けて点検できる。 | 事実の真偽は文章だけから確定できない。出典や元資料の確認が必要。 |
| [writing-style](https://github.com/takekazuomi/takekazuomi-claude-plugins/blob/main/plugins/writing-style/skills/writing-style/SKILL.md) | ブログ等は casual、仕様書・設計書等は formal と文書種別で切り替える。執筆後に削除、論理、通読、文字数、任意の textlint を確認する。 | 同じ「良い日本語」でも用途ごとに文体と情報密度を変える。機械検査を論理検査の代わりにしない。 | スタイルの二分法や著者固有の好みは、そのまま共通規則にしない。 |
| [japanese-writing](https://github.com/ultimatile/dotfiles/blob/main/.claude/skills/japanese-writing/SKILL.md) | 修辞の抑制、語格・用語の一貫性、引用符などを点検。プロジェクト固有の表記は現地のガイドや用語集に委ねる。 | 共通の文章規則と、案件ごとの用語・書式を分ける設計。既存の textlint 設定があれば利用する。 | 他スキルへの依存や、毎回の確認手順は、このリポジトリの運用に合わせて簡素化する。 |
| [ja-proofreading](https://github.com/sanoakr/ai-skills/blob/main/ja-proofreading/SKILL.md) | textlint の日本語プリセットで、文長、読点、ら抜き、文体混在などを検出する校正スキル。 | 表記・語法の機械的な問題を再現可能に見つける。修正が機械的か、判断が必要かを分ける。 | ツールの検出結果は文意、論証、用途への適合を保証しない。必要な依存の導入も別途検討する。 |

## 分かったこと

1. **執筆と校正は別の作業である。** 構成や論証を作る規範と、表記ゆれを探す textlint は補完関係にある。後者の合格だけで文章全体の品質を保証しない。[japanese-tech-writing](https://gist.github.com/k16shikano/fd287c3133457c4fd8f5601d34aa817d)、[ja-proofreading](https://github.com/sanoakr/ai-skills/blob/main/ja-proofreading/SKILL.md)
2. **指摘は箇所と理由を示す。** 日本語として不自然に見える語でも、読者や文体によって許容される。欠陥と好みを分け、直す必要がある場所だけを返す方式が有用である。[jp-style-check](https://github.com/Forest-Project-Lab/jp-writing-skills/blob/main/plugin/skills/jp-style-check/SKILL.md)
3. **案件ごとの用語と形式を優先する。** 仕様書の既定書式や用語集を汎用の文体規則で壊さない。文書種別に応じて、読み物と業務資料の求める密度を変える。[japanese-writing](https://github.com/ultimatile/dotfiles/blob/main/.claude/skills/japanese-writing/SKILL.md)、[writing-style](https://github.com/takekazuomi/takekazuomi-claude-plugins/blob/main/plugins/writing-style/skills/writing-style/SKILL.md)
4. **論理の検査には元資料が要る。** 主張と根拠の対応や因果の飛躍は文章上で点検できるが、根拠そのものが真実かは別途確かめる。[logic-jp-check](https://github.com/Forest-Project-Lab/jp-writing-skills/blob/main/plugin/skills/logic-jp-check/SKILL.md)

## このリポジトリへの適用案

[write-clear-japanese](../../skills/write-clear-japanese/SKILL.md) は、読者、根拠、段落、因果、用語を扱っている。今回の調査から追加を検討するなら、次の順が適切と考える。

1. 実際の文書で、意味の曖昧さ、訳語調、用語の不一致が起きた箇所を集める。修正理由と、修正しない例も残す。
2. 推敲を依頼されたときの出力を、完成稿と「判断が必要な箇所」に分ける。欠陥のない項目を長く列挙しない。
3. 表記ゆれが繰り返し起きる場合だけ、プロジェクトの用語集や textlint 設定を検討する。個別スキルへ語句の長い禁止リストを追加しない。

AI slop 対策との関係は [別の調査](ai-slop-skills-research.md) にまとめた。日本語の自然さ、論理の正確さ、表記の統一は重なるが、同じ検査ではない。

文化庁、JTF、textlint などスキル以外の資料は、[日本語ライティングの参考資料調査](japanese-writing-references-research.md)にまとめた。
