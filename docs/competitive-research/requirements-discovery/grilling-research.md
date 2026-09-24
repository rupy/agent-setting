# grilling の調査

調査日: 2026-09-21

## 調査の範囲

[mattpocock/skills](https://github.com/mattpocock/skills) の `grilling` と関連スキルの指示・利用説明を確認した。質問を通じて計画や設計の曖昧さを解消し、要求を整理する方法を対象とする。実際に聞き取りを行い、効果や利用者の負担を比較して測定したものではない。

## 比較

現行スキルは要件の文書化、`grilling` は判断を明確にする聞き取りを主に扱う。以下は指示の比較であり、性能の優劣を示すものではない。

| 比較軸       | 現行の create-requirements-docs                        | grilling と関連スキル                                      |
| ------------ | ------------------------------------------------------ | ---------------------------------------------------------- |
| 主な目的     | 業務、機能、非機能、受け入れ条件などを要件書にまとめる | 計画や設計について利用者との認識を揃える                   |
| 質問の扱い   | 重要な未決事項を質問し、仮定や未決事項を明記する       | 各質問の前提を整理し、今答えられる質問をまとめて聞く |
| 既存情報     | 既存資料や実装を確認する                               | 調べられる事実はAIが調査し、選択は利用者に聞く             |
| 記録         | 判断、未決事項、仮定・制約、用語などの保存先がある     | 単体では定義しない。関連スキルもすべての決定を記録するとは限らない   |
| 完了の考え方 | 未決事項を明示しながら、要件書を整理・点検する         | 分岐する質問をすべて確認し、認識が揃ったかを利用者に確認する         |

出典: [create-requirements-docs](../../../skills/create-requirements-docs/SKILL.md)、[要件書テンプレート](../../../skills/create-requirements-docs/assets/requirements-template/README.md)、[grilling][skill]、[grill-with-docs の説明][with-docs-guide]。

## 分かったこと

1. **質問の前提を整理する。** ある判断が次の判断の前提になる関係を「design tree」、そのうち前提が揃って今答えられる質問の集まりを「frontier」と呼ぶ。独立した質問をまとめて提示し、回答後に次の質問を組み直す。例えば、社外利用を対象とするか決めてから、社外利用者の登録方法を聞く。これは説明用の例であり、このリポジトリの決定事項ではない。[指示][skill]、[利用説明][guide]
2. **調べられる事実と利用者の判断を分ける。** ファイルやツールで分かる事実はAIが調べ、利用者には意思決定を求める。調査結果を待つ論点があっても、その結果に左右されない質問は進める。元のスキルは調査にサブエージェントを使うよう求めている。取り入れる際に必須とするかは、実行環境と作業の規模に応じて判断する。[指示][skill]
3. **推奨案と合意を区別する必要がある。** 各質問に推奨回答を添えるため、利用者の同意が何を指すか曖昧になる場合がある。作者も、推奨案に同意することが、質問自体には「いいえ」と答えることになる例を挙げている。回答の内容を明示し、未回答を合意として扱わない。[利用説明][guide]、[grill-me の説明][grill-me-guide]
4. **質問の順序と終える時点はAIが判断する。** 質問の依存関係を計算する専用プログラムはない。作者も、前の回答が必要な質問を同じ回に混ぜてしまう場合があると説明している。分岐する質問をすべて確認するまで続けるため、対象が広いと聞き取りが長引く可能性がある。一問ずつ聞くよう指定することもできる。試作や実測が必要な問題は、質問だけで決めようとしない。[指示][skill]、[利用説明][guide]、[grill-me の説明][grill-me-guide]
5. **文書化は別の仕組みで補う必要がある。** `grilling` 単体は保存先を定義しない。`grill-with-docs` も、用語集と条件を満たす設計判断を残すもので、すべての要求を記録するとは限らない。会話から仕様をまとめる `to-spec` は別工程である。[grill-with-docs の説明][with-docs-guide]、[to-spec][to-spec]

関連スキルの役割は次のとおり。

| スキル                       | 対象と方法                                              | 適用時の注意                                                                        |
| ---------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [grill-me][grill-me]         | 利用者が呼び出し、`grilling` を読み込ませる入口         | 専用の作業ファイルは作らない                                                        |
| [grill-with-docs][with-docs] | `grilling` と `domain-modeling` を組み合わせる入口      | 関連スキルの読み込みが実行環境によって失敗する事例が作者から報告されている          |
| [domain-modeling][domain]    | `CONTEXT.md` に用語集、`docs/adr/` に設計判断を記録する | 設計判断の記録（ADR）は、後から変えにくい、背景の説明が必要、実際のトレードオフがある、という三条件を満たす場合に限る |
| [to-spec][to-spec]           | 既存の会話やコードから仕様をまとめ、課題管理へ公開する  | 新たな聞き取りは行わず、会話中の条件をすべて保存できるとは限らない                        |

確認した `grilling` 配下は `SKILL.md` と `agents/openai.yaml` の2ファイルで、実行スクリプトは含まれない。関連資料では専用の自動テストや効果比較の評価結果は確認できなかった。作者の「13個の質問を約3回にまとめる」という例も、要求の品質や利用者の負担の比較実測とは区別する。[利用説明][guide]

## このリポジトリへの適用案

現行の [create-requirements-docs](../../../skills/create-requirements-docs/SKILL.md) には、要求、判断、仮定、未決事項の保存先がある。聞き取りを補う方法として、次の順で試すのがよい。

1. 今回決める範囲を定め、既存の資料やコードを調べる。利用者の判断が必要な重要事項を整理し、前提が揃った質問から聞く。
2. 回答に応じて質問を組み直す。分からない事項は保留し、その回答が必要な論点だけを止める。前提が変わったら、それに基づく判断も見直す。
3. 回答を既存テンプレートへ引き継ぐ。目的は業務概要、対象範囲はスコープ、判断理由・未決事項・仮定・用語はそれぞれの付録へ記録する。
4. 小さな要求整理を一件試し、既知の事実を聞き直していないか、推奨案を合意済みとして扱っていないか、数値条件や対象外の範囲が文書に残っているかを確認する。

あらゆる判断を利用者に質問したり、すべての論点が解決するまで作業を止めたりすることを共通ルールにはしない。会話で決められない事項は次の検証方法とともに記録する。詳細な聞き取りは要求を詳しく検討する場面に限り、関連スキルの読み込み方や外部公開の手順は一括で導入しない。

項目別の判断は[採否検討](inclusion-review/grilling.md)にまとめた。今回の判断は適用案であり、スキル本文への反映や、聞き取りでの効果確認は行っていない。

[skill]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grilling/SKILL.md
[guide]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/productivity/grilling.md
[grill-me]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grill-me/SKILL.md
[grill-me-guide]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/productivity/grill-me.md
[with-docs]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/grill-with-docs/SKILL.md
[with-docs-guide]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/grill-with-docs.md
[domain]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md
[to-spec]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-spec/SKILL.md
[plugin]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/.claude-plugin/plugin.json
[license]: https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/LICENSE
[format-change]: https://github.com/mattpocock/skills/commit/85f83d3fde1d3a90d5c9a657f6998c79a6c37308
[round-change]: https://github.com/mattpocock/skills/commit/a4b2009a1a3ac9575506c10b4c84f08f9bba7a38
