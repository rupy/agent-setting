# natural-japanese の調査

調査日: 2026-09-23

## 調査の範囲

[coji/natural-japanese](https://github.com/coji/natural-japanese) の `SKILL.md`、参照資料、検査スクリプト、公開評価を確認した。日本語の文書作成・推敲に役立つ方法を対象とし、[日本語ライティング系スキルの調査](japanese-writing-skills-research.md)を補う。付属テストと一部のコマンドは実行したが、文章の品質や読者の理解度を比較して測定したものではない。

## 比較

現行スキルは、全体像と要点をつかみやすくする判断基準が中心で、外部の校正ツールは必須にしていない。以下は指示の比較であり、性能の優劣を示すものではない。

| 比較軸           | write-clear-japanese                                 | natural-japanese                                                                         |
| ---------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 読者と前提       | 読者の知識、用途、必要な前提を確認する               | 読者・目的・文書の種類を決め、種類別の資料を参照する                                     |
| 構成             | アウトラインを作り、説明順とまとまりを点検する       | 執筆前に構成を決め、完成後に見出しと段落先頭を抜き出して読む                             |
| 意味の保持       | 省略によって条件、責任の所在、不確実性を変えない             | 未定の内容を断定せず、著者の意図や方針を勝手に足さない                                     |
| 修正範囲         | 好みだけで言い換えず、必要なら構成から直す           | 元の良い箇所を残す。変更箇所が多い場合の記録など、具体的な運用規則もある                 |
| 見出し・箇条書き | 用途に応じた短い見出しと、要点を探せる箇条書きを使う | 結論を含む見出しや地の文を重視する。ただし短い見出しや同じ位置づけの項目を並べた箇条書きを残す例外もある |
| 検査             | AIによる全体点検。専用スクリプトは付属しない         | lint、構成・用語の抽出、指摘の記録、再検査を組み合わせる                                 |
| 評価             | 用途に照らして判断し、文字数などを一律に固定しない   | 指摘から算出する自然度と、6観点の自己評価を別に定義する                                  |

出典: [現行スキル](../../../skills/write-clear-japanese/SKILL.md)、[作業手順][skill]、[文体憲法][constitution]、[推敲手順][revision]、[評価基準][rubric]。

## 分かったこと

1. **執筆と検査を一つの手順にしている。** 読者・目的・構成を決めて執筆する。機械検査の指摘は文脈に照らし、直すか残すかを判断してから再検査する。簡易な quick モードでも lint と構成の通読を行う。詳しく確認する full モードでは、追加検査と複数のサブエージェントによるレビューを求める。`uv` が使えない場合の手動手順もある。[作業手順][skill]、[推敲手順][revision]
2. **構成や用語の見落としを減らす補助になる。** `outline.py` は見出しと段落先頭などを、`terms.py` は用語候補と初出位置などを抽出する。説明の順序が適切か、用語の説明が十分かは、抽出結果を読んで判断する必要がある。[構成抽出][outline]、[用語抽出][terms]
3. **指摘件数や点数は品質の保証ではない。** `lint.py` は定型表現や翻訳調などを検出し、`--baseline` で前回との差を示す。`--reading-load` による読みづらさの指摘は別枠で示し、自然度の点数や前回の結果との比較には含めない。診断の `score` は文書を書き換えず、AI生成の確率や読者の理解度を示すものでもない。[lint][lint]、[診断方法][diagnose]
4. **終了条件には整理が必要である。** SKILL.md では、理由があれば指摘を残す判断を認めている。一方、評価基準では指摘が0件になるまで修正し、6観点すべて90点以上・平均92点以上にするよう求めている。これらの条件がこのリポジトリに合うかは未確認のため、そのまま合格基準にはしない。太字や見出しの数、筆者の実感を含める指示も、文書の目的に合わせて判断する。[作業手順][skill]、[評価基準][rubric]、[文体憲法][constitution]
5. **公開評価は、何を確かめたものかを分けて読む必要がある。** スキルの呼び出し条件はロールプレイで評価している。文章への適用評価は5件の文書をLLMで判定したもので、読解負荷の検査条件は非公開の241文書を使って調整している。この241文書はほぼAI生成と記載されており、一般の読者による理解度の検証とは区別する。過剰な見出し変更などの問題も記録されているが、現行資料には対策が加わっているため、過去の所見を現在の不具合と断定しない。今回、公開評価は再実行していない。[呼び出し条件の評価][trigger-eval]、[適用結果][skill-eval]、[読解負荷の調整記録][reading-eval]

## 実行確認

出典リンクに示した版のコードを一時的に取得し、macOS（Darwin x86_64）、`uv 0.9.26` の環境で実行した。付属の回帰チェックは、既知の文書で検出件数が変わっていないかを見るテストである。[回帰チェック][fixtures]

| 実行対象                                                 | 結果                                                    |
| -------------------------------------------------------- | ------------------------------------------------------- |
| `ai-smelly.md`、通常の検査                               | 25件。付属テストの期待値と一致                          |
| `ai-smelly.md`、`--experimental`                         | 33件。期待値と一致                                      |
| `natural.md`、通常／`--experimental`                     | どちらも0件。期待値と一致                               |
| `ai-smelly.md`、`--genre business --reading-load --json` | 通常の指摘25件と、読解負荷の指摘0件を別のJSON項目で出力 |
| 上記JSONを `--baseline` に渡し、同じ入力を再検査         | 解消0件、新規0件、継続25件                              |
| `outline.py --json`、`terms.py --json`                   | それぞれ14項目のJSONを出力                              |
| 存在しない入力を `lint.py` に指定                        | 終了コード1。指摘のある正常入力は終了コード0            |

再実行する場合は、対象コミットを取得したリポジトリの直下で次を使う。`uv` がPATHに必要で、初回は依存パッケージを取得する。

```sh
bash dev/check-fixtures.sh
uv run skills/natural-japanese/scripts/lint.py \
  skills/natural-japanese/scripts/fixtures/ai-smelly.md \
  --genre business --reading-load --json > /tmp/natural-japanese-baseline.json
uv run skills/natural-japanese/scripts/lint.py \
  skills/natural-japanese/scripts/fixtures/ai-smelly.md \
  --genre business --reading-load --json --baseline /tmp/natural-japanese-baseline.json
uv run skills/natural-japanese/scripts/outline.py \
  skills/natural-japanese/scripts/fixtures/ai-smelly.md --json
uv run skills/natural-japanese/scripts/terms.py \
  skills/natural-japanese/scripts/fixtures/ai-smelly.md --json
```

確認できたのは、付属テストの再現と一部の入出力まで。指摘0件は、分かりやすさや正確さの保証ではない。読み手に必要な前提の説明不足や、事実の誤りまで検出できたとは判断しない。full のレビュー工程、診断の採点、`semantic.py`、実案件での改善効果・処理時間・誤検出率は未検証である。

## このリポジトリへの適用案

現行の [write-clear-japanese](../../../skills/write-clear-japanese/SKILL.md) は、読者、構成、意味の保持、全体の点検を既に扱っている。追加を検討するなら、次の順が適切と考える。

1. 長い説明文や報告書で、見出しと段落先頭だけを読んで説明の流れを確認する。すべての段落先頭に結論を強制しない。
2. 用語や表記の見落としが繰り返される場合に、抽出ツールや lint、前回の指摘との比較を補助として試す。
3. 同じ素材・依頼条件で現行スキルだけの場合と比較し、前提の説明不足を補えたか、不要な変更がないか、意味を保てたか、負担がどれだけ増えたかを確認して採用を判断する。

通常の lint は Python 3.10以上と `sudachipy`・辞書パッケージを使う。実験用の `semantic.py` は別機能で、追加ライブラリと初回約1GBのモデル取得が必要と説明されている。今回はこちらを実行しておらず、標準導入は保留とする。[lint][lint]、[semantic.py][semantic]

項目別の判断は[採否検討](inclusion-review/japanese-writing/natural-japanese.md)にまとめた。今回の追加は調査記録であり、スキル本文への反映や導入の決定ではない。

[plugin]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/.claude-plugin/plugin.json
[license]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/LICENSE
[skill]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/SKILL.md
[constitution]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/references/writing-constitution.md
[revision]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/references/revision-guide.md
[diagnose]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/references/diagnose.md
[rubric]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/references/eval-rubric.md
[lint]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/scripts/lint.py
[outline]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/scripts/outline.py
[terms]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/scripts/terms.py
[semantic]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/skills/natural-japanese/scripts/semantic.py
[trigger-eval]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/evals/RESULTS.md
[skill-eval]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/corpus/reports/skill-eval-findings.md
[reading-eval]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/corpus/reports/reading-load-calibration.md
[fixtures]: https://github.com/coji/natural-japanese/blob/9a78a42964096da509b8f3e011f0085a5f080151/dev/check-fixtures.sh
