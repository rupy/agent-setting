# 文書の認知負荷を減らす公開 skill の調査

調査日: 2026-09-22

## 目的と調査範囲

文書を書くとき、読み手が必要な情報を探し、理解し、実行するまでの余分な手間を減らすために使える公開 `SKILL.md` を調べた。AI slop の語句や文体の検出だけでなく、読者設定、情報の構成、説明の順序、手順の検証までを対象にした。各スキルの記述を確認した調査であり、導入効果を比較実験したものではない。

候補は [skills.sh の公開ランキング](https://www.skills.sh/)と[直近のランキング](https://www.skills.sh/trending)、GitHub の関連リポジトリ、既知の Skill 集から探し、配布元の `SKILL.md` または README を確認した。ランキングは同サイトの CLI によるインストール計測であり、全配布経路や品質を示さない。「話題」は発見の手掛かりとして使い、採用理由にはしない。

この文書では「認知負荷」を単一の点数として扱わない。読者の目的に必要な思考は残し、不要な探索、前提の推測、文の読み直し、手順の試行錯誤を減らすための設計として整理する。研究・公的指針の確認は[別の調査](low-cognitive-load-writing-research.md)を参照。

## 確認した skill

| skill | 主な対象と方法 | 認知負荷対策として参考になる点 | このリポジトリでの扱い |
| --- | --- | --- | --- |
| [docs-writing](https://github.com/mblode/agent-skills/blob/main/skills/docs-writing/SKILL.md) | 技術文書を読者の作業に応じてチュートリアル、手順、リファレンス、解説に分類し、種類に合う規則だけを適用する。例とリンクの動作も確認する。 | 文書種別を先に決めることで、作業中の読者に不要な背景説明を読ませたり、学習中の読者に前提なしの操作をさせたりする問題を減らす。 | 要件定義・設計文書では、同一ファイルに複数の目的がある場合もある。分類を機械的な分割命令にしない。 |
| [plain-language](https://github.com/davidamitchell/Skills/blob/main/plain-language/SKILL.md) | 専門外の読者向けに、知識、読む場面、読後の行動を設定してから書き換える。条件、例外、不確実性を残す精度確認がある。 | 短文化を先に目標とせず、読者が理解に必要な前提と言葉を選ぶ。平易化で意味を失った箇所も点検できる。 | 専門家向けの仕様には技術用語を残す。法的・契約上の定型文は勝手に変更しない。 |
| [plain-language（arjunprabhulal）](https://github.com/arjunprabhulal/agent-skills/blob/main/skills/docs/plain-language/SKILL.md) | 背景知識のない読者に概念を説明する。必要な専門語を説明し、判断を変える留保条件を残す。 | 読みやすいが判断には使えない曖昧な文章を避ける観点がある。 | 前項と重なるため、導入候補を増やすより精度確認の観点を参考にする。 |
| [docs-writer（Prisma）](https://github.com/prisma/web/blob/main/.claude/skills/docs-writer/SKILL.md) | 製品文書の手順・概念・リファレンスを区別する。手順には前提、実行内容、期待結果、よくある失敗を記載する。 | 読者が操作の意味と成功状態を自分で推測する負担を減らす。概念は平易な説明、具体例、正確な用語の順に導入する。 | Prisma 固有の構成や名称は移さず、手順の完了確認と前提の置き方を参考にする。 |
| [information-architecture](https://github.com/rampstackco/claude-skills/blob/main/skills/information-architecture/SKILL.md) | 複数ページのサイトやナレッジベースの分類、ナビゲーション、ラベルを設計する。カードソートやツリーテストも挙げる。 | 読者の言葉と探し方でページをまとめ、どこを開くべきかの迷いを減らす。 | 単一文書の文章推敲には大きすぎる。HTML の複数ページ資料や文書群の目次を見直す際に使う。推奨数値を普遍的な認知負荷の閾値とみなさない。 |
| [doc-coauthoring](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md) | 文書の種類、読者、読後に起こしたい行動を確認し、節ごとに下書き・修正・通読を進める共同執筆。 | 執筆前に目的と読者を明確にし、節間の重複や欠落を最後に確認する流れが参考になる。 | 質問と選択を毎節繰り返す手順は重い。十分な資料と指示がある場合は質問を省き、要点だけ採用する。 |
| [technical-writing-guide](https://github.com/strictdoc-project/technical_writing_skill/blob/main/SKILL.md) | 技術文書・README・仕様書向け。結論を先に示し、文・見出し・表を点検し、技術的正確さを維持する。 | 読者が最後まで読まないと要点を得られない構成を避ける。書き換え後にも再点検する。 | 結論先行は報告や判断資料で有効だが、教材や調査過程を追う文書に一律適用しない。起動時の定型出力など、読者の役に立たない運用規則は採用しない。 |
| [writing-clearly-and-concisely](https://github.com/softaworks/agent-toolkit/blob/main/skills/writing-clearly-and-concisely/SKILL.md) | 文書、説明、報告、UI 文言など、人が読む文章全般。Strunk の文章原則を参照し、段落の主題、具体語、関連語の近接、不要語の削除を点検する。 | 一文や段落を理解する際の戻り読みを減らす観点が明確。必要な参照資料だけ読む構成も参考になる。 | 英語の文法・語順規則を日本語に直輸入しない。AI 文体の兆候集は[既存調査](ai-slop-skills-research.md)と重なるため、段落と情報配置に関する観点を重視する。 |
| [crafting-effective-readmes](https://github.com/softaworks/agent-toolkit/blob/main/skills/crafting-effective-readmes/SKILL.md) | README の読者とプロジェクトの種類に応じ、概要、導入、使用例などの必要な節を選ぶ。 | 初めて訪れた読者が何のリポジトリか把握し、最初の成功まで進む経路を設計できる。 | README 専用として扱い、要件定義書や一般の報告書にテンプレートを流用しない。 |
| [writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md) | Skill、`AGENTS.md`、`CLAUDE.md` など、エージェントが読む文書。手順と参照情報の階層、参照先を開く条件、完了条件を整理する。 | 常時読む情報と必要時だけ読む情報を分け、エージェントのコンテキスト負荷と、人が参照先を覚える負荷の両方を考える。 | 人間向け文書の読解研究とは区別する。このリポジトリの Skill と共通指示を見直す際には直接役立つ。 |
| [writing-skills（Superpowers）](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) | Skill の作成・改訂・検証。利用場面を記した短い入口、必要な参照資料への分割、実例による動作確認を扱う。 | Skill が増えても、読むべき指示を探しやすくする設計と、指示が実際に行動を変えるか確かめる方法がある。 | 対象は Skill の執筆であり、一般文書の認知負荷対策としては間接的。検証手順にはサブエージェントを使うため、通常の文章推敲へ一律に適用しない。 |
| [i-have-adhd](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md) | 対話での回答形式を調整する。次の行動を先に示し、複数の操作を番号で分け、脱線を抑え、会話をまたぐ際に進捗を再提示する。 | 読者が「何をすればよいか」を探す手間と、前の応答を覚えておく負担を減らす発想がある。作業手順や進捗報告にも応用できる。 | 元の対象はコーディング支援の対話であり、あらゆる文書に「次の行動を先頭」「一覧は5件以下」を強制しない。ADHD の人全員に同じ形式が有効という検証結果として扱わない。 |
| [ADHD & 47 Tabs](https://github.com/zgbrenner/adhd-and-47-tabs) | `i-have-adhd` から派生した、回答・行動・成果物・進捗報告の形式を分ける skill。README は、完了した回答に無理に次の作業を付けず、求められた情報を件数制限で切らない方針を示す。 | 「短い回答」だけを目標にせず、回答の種類に応じて必要な情報の見せ方を選ぶ考え方が参考になる。 | 派生 skill であり、独立した効果の証拠ではない。主に対話と作業支援向け。確認できた記述は README と研究メモに基づく。 |
| [writing-beats](https://github.com/mattpocock/skills/blob/main/skills/in-progress/writing-beats/SKILL.md) | 素材から記事を一段ずつ組み立てる共同執筆。読者が知っている概念を先に決め、新しい概念は後続の段落が使う前に説明する。 | 説明されていない概念に依存して話が進むのを防ぐ。読み手の前提知識に合わせて、説明の順序を決められる。 | 記事執筆向けで、現時点では `in-progress` 配下。逐次選択する対話形式は、定型文書や大量のページ作成には重い。 |
| [writing-shape](https://github.com/mattpocock/skills/blob/main/skills/in-progress/writing-shape/SKILL.md) | 素材から段落単位で記事を構成する。前提概念を確認し、文章・リスト・表・注記などの形式を内容に合わせて選ぶ。 | 概念の導入順と、並列項目をリストにするか論証を文章にするかの判断を明示する。 | 同じく記事向け・`in-progress`。節ごとに利用者の選択を求める手順は、用途と所要時間に合わせて簡略化する。 |
| [build-report（OpenAI）](https://github.com/openai/role-specific-plugins/blob/main/plugins/data-analytics/skills/build-report/SKILL.md) | 分析結果を報告書にする skill。最初に問いへの答えを置き、数値の定義・比較基準・根拠・留保・次の判断を対応付ける。 | 読者が図表だけから意味を推測したり、後ろの節から条件を探したりする負担を減らす。 | 分析報告専用。公開リポジトリは 2026-09-16 にアーカイブされており、そのまま導入するより構成上の参考とする。 |
| [blog-prose](https://github.com/sjmoran/claude-blog-prose/blob/master/skills/blog-prose/SKILL.md) | ブログ、技術記事、解説記事向け。直感的な説明から仕組みへ進み、概念を説明してから用語を導入する。主張を検証できる形にする。 | 技術的な深さを削るのではなく、初めて読む人が追える順番に配置する。次の節が答えるべき問いも意識する。 | 記事向けで規則の量が多い。要件定義や短い業務連絡へ文体規則を流用せず、概念の導入順だけ参考にする。 |
| [accessible-content](https://github.com/Owl-Listener/designpowers/blob/main/skills/accessible-content/SKILL.md) | Web・アプリの見出し、リンク、フォーム、エラー、画像説明、表を対象とする。読み上げ時の探索や、エラー時の対処まで確認する。 | ページの見た目だけでなく、見出し一覧やリンク一覧から目的を探せるか、エラー文だけで次の行動が分かるかを点検できる。 | HTML 文書や画面内の案内に有用。英語の読解年齢や一文一概念などの数値・規則を日本語へそのまま移さない。 |
| [plain-language-design](https://github.com/Owl-Listener/inclusive-design-skills/blob/main/cognitive-accessibility/skills/plain-language-design/SKILL.md) | 認知アクセシビリティを意識した UI 文言・手順・ヘルプの推敲。読者が次に行う操作の曖昧さと、エラー文の説明不足を点検する。 | 表現を簡単にするだけでなく、指示の行動と主体を特定できるかを見る。変更前・問題・修正文を並べるレビュー形式も使える。 | 既出の `plain-language` と重なる。英語の語数・学年水準や「5秒」などは効果が確認された普遍的な閾値として採用しない。 |

## 使える設計原則

1. **読む人の課題を先に定める。** 誰が何を判断・実行・理解するかを明記してから、内容の採否と順序を決める。対象読者が不明なまま短くするだけでは、必要な条件まで消しやすい。[plain-language](https://github.com/davidamitchell/Skills/blob/main/plain-language/SKILL.md)、[doc-coauthoring](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md)
2. **文書の用途に合わせて構成する。** 手順、参照、学習、説明では、最初に必要な情報が違う。混在が必要な場合は見出しとリンクで目的を分かるようにする。[docs-writing](https://github.com/mblode/agent-skills/blob/main/skills/docs-writing/SKILL.md)、[docs-writer](https://github.com/prisma/web/blob/main/.claude/skills/docs-writer/SKILL.md)
3. **実行に必要な情報を操作の近くに置く。** 適用条件、入力、操作、期待結果、失敗時の対処を読者が行き来せずに確認できるようにする。条件や例外を削って見かけの文量だけを減らさない。[docs-writer](https://github.com/prisma/web/blob/main/.claude/skills/docs-writer/SKILL.md)、[plain-language](https://github.com/davidamitchell/Skills/blob/main/plain-language/SKILL.md)
4. **文書群では探し方を検証する。** 見出し・ページ名・目次は、書き手の分類だけでなく読者の語彙と探索課題で確かめる。[information-architecture](https://github.com/rampstackco/claude-skills/blob/main/skills/information-architecture/SKILL.md)
5. **読みやすさと正確さを別々に確認する。** 読み通せても、条件の誤解や誤操作が残れば改善できていない。元資料との意味の一致、例の実行、リンク、読者による探索と理解を用途に応じて確認する。[plain-language](https://github.com/davidamitchell/Skills/blob/main/plain-language/SKILL.md)、[docs-writing](https://github.com/mblode/agent-skills/blob/main/skills/docs-writing/SKILL.md)
6. **指示文書では読む条件を明記する。** Skill や共通指示では、常に必要な手順を入口に置き、特定の場面だけで必要な参照情報には開く条件を付ける。分割しすぎると人が文書の所在を覚える負担が増えるため、利用経路も確認する。[writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)、[writing-skills](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md)
7. **作業支援では次の行動と現在地を見える場所に置く。** 複数手順は実行順に番号を付け、会話をまたぐ作業では完了した段階と次の段階を短く示す。ただし、説明や比較が目的の文書では必要な背景と選択肢を残す。[i-have-adhd](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md)
8. **説明の前提を追跡する。** 新しい概念に進む前に、読み手がその概念を既に知っているか、前の節で説明したかを確かめる。用語を言い換えるだけでは、前提となる考え方の欠落を埋められない。[writing-beats](https://github.com/mattpocock/skills/blob/main/skills/in-progress/writing-beats/SKILL.md)、[writing-shape](https://github.com/mattpocock/skills/blob/main/skills/in-progress/writing-shape/SKILL.md)
9. **HTML では本文以外の文字列も点検する。** 見出し、リンク名、画像説明、フォームのラベル、エラー文は、単独で読まれたときにも対象と次の行動が分かるようにする。[accessible-content](https://github.com/Owl-Listener/designpowers/blob/main/skills/accessible-content/SKILL.md)、[plain-language-design](https://github.com/Owl-Listener/inclusive-design-skills/blob/main/cognitive-accessibility/skills/plain-language-design/SKILL.md)

## このリポジトリへの適用案

既存の [write-clear-japanese](../../../skills/write-clear-japanese/SKILL.md) は、文と段落の明確さ、根拠、因果、自然な日本語を扱う。公開 skill から追加を検討するなら、まず「読者が何をする文書か」「見出しから目的の情報を探せるか」「手順に成功の確認方法があるか」の三点を、文書作成時の確認項目として試すのがよい。複数ページの [HTML 要件定義・設計資料](../../../skills/create-requirements-html/SKILL.md) では、目次のラベルとページ間の移動を別に確認する。

今回の追加調査で、一般の文書、対話の回答、エージェントが読む指示文書では負荷の発生箇所が異なることも分かった。既存 skill の改訂を判断する際は、人向けには実際の読み手による探索・理解・手順完了を、エージェント向けには指示の発見と実行結果を確認する。各公開 skill の効果は、このリポジトリでは実測していない。

### 調査時に除外した候補

- [ponytail](https://github.com/DietrichGebert/ponytail): 直近に話題の skill だが、主題はコードを書く量と方法で、文書の読者が負担なく理解するための skill ではない。
- [ADHD と名の付く発散的推論 skill](https://github.com/UditAkhourii/adhd/blob/main/skills/adhd/SKILL.md): 名前は近いが、主題はエージェントの案出し・推論であり、読み手に見せる文書形式ではない。
- [edit-article](https://github.com/mattpocock/skills/blob/main/skills/personal/edit-article/SKILL.md): 記事編集の候補として確認したが、配布元の[変更履歴](https://github.com/mattpocock/skills/blob/main/CHANGELOG.md)に退役 skill として記載されるため、現行候補には含めない。
- [ux-writing](https://github.com/content-designer/ux-writing-skill/blob/main/SKILL.md): UI 文言の観点は有用だが、文長・読解水準・理解率を普遍的な数値基準のように記す箇所がある。今回の一覧では、用途が重なる `accessible-content` と `plain-language-design` を優先した。
