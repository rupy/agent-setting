---
name: create-requirements-docs
description: ビジネス背景からターゲット・ペルソナ、業務フローのBefore／After、機能・データ・外部連携・非機能要件、受入条件までの追跡可能な要件定義Markdown文書と、必要に応じて開発計画および要件から分離した技術設計文書を作成または更新する。新規プロジェクトの要件整理、既存仕様の文書化、業務変更の可視化、要件テンプレートの適用、要件レビュー、開発フェーズや技術設計の整理を依頼されたときに使用する。
---

# 要件定義ドキュメント作成

ビジネス上の目的を起点に、検証可能な要件と受入条件まで段階的に具体化する。特定規格への完全準拠を称さず、BABOK、ISO/IEC/IEEE 29148、SRS、Volere、Use Case、C4、ADRの実務的な考え方を組み合わせる。

## 作業フロー

1. リポジトリの指示、既存文書、用語、実装、課題管理資料を確認する。
2. ユーザーが文書の作成・編集まで求めているか確認する。計画や提案だけの場合はファイルを変更しない。
3. 十分な情報がなければ、安全に推測できない重要事項だけを質問する。回答待ちで止める必要がなければ、仮定と未確定事項を明示して進める。
4. 文書を作成・更新する前に、対象に対応する `references/example-*.md` を読み、文章の粒度、属性、要件間のつなぎ方を確認する。例の固有名詞、数値、業務ルールは転用しない。
5. 新規作成では `assets/requirements-template/` を対象プロジェクトの `requirements/` へコピーする構成を基準にする。開発計画も求められた場合は、`assets/planning-template/development-plan.md` を `planning/development-plan.md` として使用する。技術設計も求められた場合は、`assets/design-template/` を `design/` として使用する。既存の文書規約があればそちらを優先し、内容だけ適用する。
6. `requirements/README.md` で文書の必須性と作成条件を確認し、必要な文書だけを選ぶ。`requirements/` 直下の文書を番号順に作成し、ビジネスと利用者の理解からシステムに求める内容へ段階的に具体化する。共通の付録は随時更新する。
7. 要件IDとリンクを用いて、ビジネス目的から受入条件までを追跡可能にする。
8. 完了前に `references/writing-rules.md` の品質チェックを実施する。

## 作成時の原則

- 確認済みの事実、仮定、提案、未確定事項を区別する。
- 不明な固有名詞、数値、法的要件、外部仕様を捏造しない。
- 「何を満たすか」を要件に書き、「どう実装するか」は必須制約を除いて設計文書へ分離する。
- 「高速」「適切」「使いやすい」など判定不能な表現を、条件・目標値・測定方法に置き換える。
- 一つの要件IDには一つの検証可能な要求を記載する。
- Must要件には原則として受入条件または検証方法を対応させる。
- 同じ説明を複数文書へ複製せず、正本となる箇所を一つにしてIDまたは相対リンクで参照する。
- 対象外、制約、リスク、未確定事項も明示する。
- テンプレートの見出しを機械的に埋めない。該当しない項目は理由を添えて省略する。

## 情報の不足時

作成に必要な情報が不足していても、確認済み部分は作成できる。次のラベルを使用する。

- `確認済み`: 根拠を確認できた内容
- `仮定`: 作業を進めるために置いた暫定条件
- `未確定`: 意思決定または追加調査が必要な内容
- `対象外`: 今回は扱わないことが合意または指定された内容

重要な未確定事項は `requirements/appendices/open-issues.md` にID、担当、期限、影響、次のアクションとともに記録する。

## 文書構成

テンプレートの各ファイルは次の責務を持つ。

| 文書 | 責務 |
|---|---|
| `README.md` | 文書群の入口、状態、ID規則、読み順 |
| `01-business-overview.md` | 背景、課題、目的、価値、成功指標 |
| `02-targets-and-personas.md` | 対象顧客、対象利用者、判断に用いる典型的な利用者像 |
| `03-stakeholders.md` | 関係者、利用者、プロジェクトとの関係、相互に与える影響 |
| `04-scope.md` | 今回作るものの大項目と対象外 |
| `05-business-process-before-and-after.md` | 現行業務と将来業務の流れ、変更点、業務ルール |
| `06-related-systems-and-integrations.md` | 関連システムの役割、システム間の関係、連携要件 |
| `07-functional-requirements.md` | 利用者が実現したいことと、システムが提供する振る舞い |
| `08-data-requirements.md` | 業務データ、品質、保持、機密区分 |
| `09-non-functional-requirements.md` | 品質、運用、セキュリティ、性能などの測定可能な条件 |
| `10-acceptance-and-traceability.md` | 受入条件、検証方法、上位要求との対応 |
| `requirements/appendices/` | ビジネスとシステムで共有する用語、仮定・制約、決定、未確定事項 |

開発計画は要件文書群へ混在させず、原則として `planning/development-plan.md` に置く。要件文書では「何が必要か」を定義し、開発計画では「どの順番で実現し、各段階を何で完了とするか」を定義する。

技術設計は要件文書群へ混在させず、`design/` に置く。基本設計は外部から見える構造・仕様を `design/basic/`、詳細設計はアプリケーション内部の実現方法を `design/detailed/` に置く。必須の標準形は `README.md`、`basic/01-system-structure.md`、`basic/02-technology-selection.md`、`basic/03-data-design.md`、`basic/05-infrastructure-and-operations.md`、`detailed/01-application-design.md` とする。外部連携がある場合は `basic/04-external-system-integration-design.md` を作成する。画面、セキュリティ、移行もREADMEの作成条件に該当する場合に基本設計へ追加し、重要な実現方法の判断は `design/decisions/` のADRへ記録する。`basic/02-technology-selection.md` は採用した技術・製品、用途、バージョン方針、関連要件・制約を一覧化する。候補の比較、トレードオフ、詳しい判断理由は重複させずADRを正本とする。画面設計では画面の構成・遷移・入力・状態表示に加え、対応端末・基本操作・アクセシビリティの方針だけを扱う。エラーの表示位置、入力値保持、画面幅別の動作、フォーカス制御、文言、共通部品などの実装仕様が必要な場合は、条件付きで `detailed/02-common-ui-design.md` を作成する。データ設計はシステム内部で扱う論理データとその関係・ライフサイクルを、外部システム連携設計は外部システムや外部サービスとの接続を扱う。複雑な制約、整合性、検索性能、履歴、スキーマ変更を実装前に合意する必要がある場合は、対象データストアごとに `detailed/data/DATA-*.md` を作成する。複数箇所で利用する、公開APIの互換性が必要、状態・並行処理が複雑、または障害影響が大きいモジュールは、対象ごとに `detailed/modules/MOD-*.md` を作成する。単純なCRUDやコードから明らかなクラス・メソッドを網羅する目的では作成しない。アプリケーション内部のモジュール間呼び出しや内部APIは詳細設計へ記載する。各設計判断は根拠となる要件ID、制約ID、決定IDを参照し、要件本文を設計文書へ複製しない。設計によって要件または制約の変更が必要になった場合は、設計だけで変更せず要件文書へ反映する。

文書の必須性は `requirements/README.md` の文書一覧を正本とし、`必須`、`条件付き`、`任意` のいずれかで示す。条件付き・任意文書には作成条件も記載する。案件固有の事情で標準の必須性を変える場合は、そのREADMEを更新する。各文書のfrontmatterや本文へ必須性を重複記載しない。

ステークホルダー文書では「誰がプロジェクトに関係し、どのような影響を受けるか、または与えるか」を記載する。具体的な業務手順は業務フロー、システムの振る舞いは機能要件を正本とし、ステークホルダー文書へ重複記載しない。利用者以外の関係者も、業務、運用、規程などへの影響があれば記載する。意思決定体制、承認経路、レビュー計画、RACIなどのプロジェクト管理情報は、明示的に必要とされない限り含めない。スコープ文書では「今回の対象にどこまで含むか」を記載し、影響関係を重複させない。

スコープ文書では「今回どこまで作るか」と「何を作らないか」を大項目で示す。プロジェクト、プロダクト、業務、機能などのスコープ分類を必須にしない。具体的な画面操作や処理条件は機能要件へ記載し、関連システムや連携方式の詳細は `06-related-systems-and-integrations.md` を正本とする。

機能要件には、対象利用者、利用者が実現したいこと、その理由、関連するスコープ・業務フローを記載したうえで、システムが提供する振る舞いを定義する。利用者の目的を独立文書へ重複させず、機能要件の根拠として一元管理する。

業務フロー Before／After文書は条件付きとし、既存業務を変更する案件で、現行と将来の手順、役割、受け渡し、業務ルールの差分を合意する必要がある場合に作成する。Beforeには確認できた現行業務と課題、Afterには合意を目指す将来業務と変更点を記載する。システムの具体的な振る舞いは機能要件を正本とし、この文書へ重複させない。比較対象となる既存業務がない場合は無理にBeforeを作らず、機能要件の利用者視点と必要な将来業務だけを記載する。

ターゲットとペルソナ文書は任意とし、対象顧客や典型的な利用者像がUI・UX、機能の優先順位、業務フローの判断に影響する場合に作成する。対価や価値提供の対象である「対象顧客」と、実際に操作または利用する「対象利用者」を区別する。社内システムなど対象顧客の概念が該当しない場合は、その理由を明記して対象外としてよい。ペルソナは調査結果または明示した仮定に基づいて作成し、裏付けのない人物像、属性、課題を事実として捏造しない。ペルソナを作らない場合でも、対象利用者はステークホルダーまたは機能要件で明確にする。

組織標準、既存基盤、契約などによる必須の技術的制約は `requirements/appendices/assumptions-and-constraints.md` に記録する。外部仕様と通信方式は連携要件、対応環境と品質水準は非機能要件を正本とする。製品、フレームワーク、データベース、クラウドサービス、コンポーネント構成などの実現方法は要件へ混在させず、`design/` の技術設計文書または決定記録へ記載する。

開発フェーズは案件に合わせて定義し、基盤、主要機能、外部連携などの固定分類を強制しない。フェーズ表には機能領域と要件IDを参照し、要件本文を複製しない。開発フェーズと利用者向けリリースを同一視せず、必要な場合だけ対応関係を追記する。日付、工数、担当者を確認できない場合は推測せず未確定事項とする。

単一部門かつ関係者と対象範囲が少なく、分割すると各文書が極端に短くなる場合は、`requirements/03-stakeholders-and-scope.md` に統合してよい。統合する場合も、ステークホルダーとの影響関係とスコープの対象・対象外を別見出しにし、後続文書の番号を詰めるかどうかは既存規約に合わせて一貫させる。標準形は分割とする。

詳細な書き方とID体系を決めるときは `references/writing-rules.md` を読む。テンプレートを作成・変更するときは `assets/requirements-template/` の該当ファイルを使用する。

例は作業対象に応じて次から直接読む。

- `requirements/README.md`: `references/example-readme.md`
- `01-business-overview.md`: `references/example-01-business-overview.md`
- `02-targets-and-personas.md`: `references/example-02-targets-and-personas.md`
- `03-stakeholders.md`: `references/example-03-stakeholders.md`
- `04-scope.md`: `references/example-04-scope.md`
- `05-business-process-before-and-after.md`: `references/example-05-business-process-before-and-after.md`
- `06-related-systems-and-integrations.md`: `references/example-06-related-systems-and-integrations.md`
- `07-functional-requirements.md`: `references/example-07-functional-requirements.md`
- `08-data-requirements.md`: `references/example-08-data-requirements.md`
- `09-non-functional-requirements.md`: `references/example-09-non-functional-requirements.md`
- `10-acceptance-and-traceability.md`: `references/example-10-acceptance-and-traceability.md`
- `appendices/glossary.md`: `references/example-appendix-glossary.md`
- `appendices/assumptions-and-constraints.md`: `references/example-appendix-assumptions-and-constraints.md`
- `appendices/decisions.md`: `references/example-appendix-decisions.md`
- `appendices/open-issues.md`: `references/example-appendix-open-issues.md`
- `planning/development-plan.md`: `references/example-planning-development-plan.md`
- `design/README.md`: `references/example-design-readme.md`
- `design/basic/01-system-structure.md`: `references/example-design-basic-01-system-structure.md`
- `design/basic/02-technology-selection.md`: `references/example-design-basic-02-technology-selection.md`
- `design/basic/03-data-design.md`: `references/example-design-basic-03-data-design.md`
- `design/basic/04-external-system-integration-design.md`: `references/example-design-basic-04-external-system-integration-design.md`
- `design/basic/05-infrastructure-and-operations.md`: `references/example-design-basic-05-infrastructure-and-operations.md`
- `design/basic/06-screen-design.md`: `references/example-design-basic-06-screen-design.md`
- `design/basic/07-security-design.md`: `references/example-design-basic-07-security-design.md`
- `design/basic/08-migration-design.md`: `references/example-design-basic-08-migration-design.md`
- `design/detailed/01-application-design.md`: `references/example-design-detailed-01-application-design.md`
- `design/detailed/02-common-ui-design.md`: `references/example-design-detailed-02-common-ui-design.md`
- `design/detailed/data/DATA-*.md`: `references/example-design-detailed-data.md`
- `design/detailed/modules/MOD-*.md`: `references/example-design-detailed-module.md`
- `design/decisions/ADR-*.md`: `references/example-design-decision.md`
- 要件の表現をレビューまたは改善するときは `references/example-writing-improvements.md` を読む。

例は構造と品質の基準として扱う。例に登場する会社、利用者、システム、数値、法令、保存期間、優先度を実案件の事実として採用しない。実案件で確認できない内容は仮定または未確定事項として記録する。

## 更新時の扱い

既存文書を更新するときは、変更対象だけでなく次の波及を確認する。

1. ビジネス目的またはスコープの変更
2. 業務フローへの影響
3. 機能・データ・外部連携・非機能要件への影響
4. 受入条件とトレーサビリティへの影響
5. 用語、仮定、決定記録、未確定事項への影響

過去の決定を上書きして理由を失わせず、重要な方針変更は `requirements/appendices/decisions.md` に追記する。

## 最終確認

- ビジネス目的のないMust要件がないか確認する。
- Must要件に検証可能な受入条件があるか確認する。
- 要件IDの重複、欠番そのものではなく参照切れを確認する。
- 文書間で用語、状態名、対象範囲、数値が矛盾していないか確認する。
- 仮定が事実として書かれていないか確認する。
- 未確定事項に意思決定のための次のアクションがあるか確認する。
- 実装設計が要件として不必要に固定されていないか確認する。
