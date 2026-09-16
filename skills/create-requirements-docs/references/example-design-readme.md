# 完全例: 技術設計README

架空の「社内経費精算システム」を題材に、対応するテンプレートの全項目を示す。例の技術選択を実案件へ転用しない。

## design/README.md

```markdown
---
title: 技術設計
status: in-review
owner: アーキテクト
reviewers:
  - 開発責任者
  - 運用責任者
last_updated: 2026-08-31
---

# 技術設計

## 文書の目的

要件定義で合意した機能、品質、連携、制約を満たす技術構成と実現方法を定義する。

## 入力となる要件・制約

FR-001からFR-004、DR-001、IF-001からIF-004、NFR-001、NFR-002、NFR-007、CON-002を入力とする。

## 文書一覧

### 基本設計

| 文書 | 内容 | 必須性 | ステータス | 責任者 |
|---|---|---|---|---|
| basic/01-system-structure.md | システム全体図、構成要素の役割、代表的な処理 | 必須 | in-review | アーキテクト |
| basic/02-technology-selection.md | 採用技術、用途、バージョン方針、ライセンス、ADR | 必須 | draft | アーキテクト |
| basic/03-data-design.md | 論理データ、関係、ライフサイクル、品質、アクセス | 必須 | draft | 開発責任者 |
| basic/04-external-system-integration-design.md | 外部システム・サービスとの接続、入出力、認証、エラー、再送 | 条件付き | draft | 開発責任者 |
| basic/05-infrastructure-and-operations.md | 環境、配備、監視、バックアップ、運用 | 必須 | draft | 運用責任者 |
| basic/06-screen-design.md | 画面一覧、遷移、構成、入力、状態表示、操作・アクセシビリティ方針 | 条件付き | draft | UX責任者 |
| basic/07-security-design.md | 脅威、認証、認可、暗号化、監査、インシデント | 条件付き | in-review | セキュリティ責任者 |
| basic/08-migration-design.md | データ移行、切替、検証、切り戻し | 条件付き | draft | 移行責任者 |
| basic/09-api-design.md | 提供API、共通方針、入出力、エラー、互換性 | 条件付き | in-review | 開発責任者 |
| basic/10-authentication-and-authorization-design.md | 認証主体、認証フロー、セッション、ロール、権限、認可規則 | 条件付き | in-review | セキュリティ責任者 |

### 詳細設計

| 文書 | 内容 | 必須性 | ステータス | 責任者 |
|---|---|---|---|---|
| detailed/01-application-design.md | モジュール、内部処理、状態、制御、バッチ | 必須 | in-review | 開発責任者 |
| detailed/02-project-directory-structure.md | ディレクトリツリー、配置ルール、依存方向、命名規則 | 必須 | in-review | 開発責任者 |
| detailed/03-common-ui-design.md | 入力、エラー表示、端末別動作、アクセシビリティ、共通部品 | 条件付き | draft | UX責任者 |
| detailed/data/DATA-001-expense-database.md | 物理構造、制約、索引、整合性、スキーマ変更 | 条件付き | draft | 開発責任者 |
| detailed/modules/MOD-001-approval-engine.md | 責務、公開API、依存関係、内部構成、品質 | 条件付き | draft | 開発責任者 |

条件付き文書は、対象となる外部連携・画面・共通UI仕様・複雑なデータ設計・難しいモジュール・セキュリティリスク・移行作業が存在する場合に作成する。重要な技術判断は `decisions/` のADRへ記録する。

## 設計原則

- 要件と制約を参照し、根拠のない構成を固定しない。
- 外部連携の失敗が申請データを失わせない構成にする。
- 重要な技術選択は比較した案と理由を決定記録へ残す。

## 主要な設計判断

- DEC-001: 初回リリースの会計連携にはCSVを使用する。
- DEC-002: Webアプリケーションとして提供する。

## 更新・レビュー方法

設計責任者が変更し、影響する要件IDと決定IDを更新する。要件または制約に影響する変更は要件責任者もレビューする。
```
