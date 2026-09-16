# 完全例: プロジェクトディレクトリ構成

架空の「社内経費精算システム」を題材に、対応するテンプレートの全項目を示す。例の構成を実案件へ転用しない。

## design/detailed/02-project-directory-structure.md

````markdown
---
title: プロジェクトディレクトリ構成
status: in-review
owner: 開発責任者
reviewers: [アーキテクト]
last_updated: 2026-08-31
---

# プロジェクトディレクトリ構成

## 1. 文書の目的
経費精算システムのコード、設定、テストの配置と依存方向を統一し、モジュール境界を実装へ反映する。

## 2. 入力となる設計・制約
`../basic/01-system-structure.md`、`../basic/02-technology-selection.md`、`01-application-design.md`、ADR-003を入力とする。

## 3. ディレクトリツリー
```text
src/
├── application/       # ユースケースとトランザクション境界
│   ├── expense/
│   └── approval/
├── domain/            # エンティティ、値、業務ルール
│   ├── expense/
│   └── approval/
├── infrastructure/    # DB、社内認証、通知、会計連携の実装
├── presentation/      # HTTP APIの入出力と認証コンテキスト
└── jobs/              # 組織情報取込、通知、会計CSV生成
tests/
├── unit/              # ドメインとユースケースの単体テスト
└── integration/       # DBおよび外部接続境界の結合テスト
```

## 4. 配置ルール
機能単位のコードは対応する `application/` と `domain/` の配下へ置く。DBや外部サービス固有のコードは `infrastructure/`、HTTP固有の変換は `presentation/` へ置く。複数機能で使うという理由だけで汎用ディレクトリを追加しない。

## 5. 依存方向と境界
`presentation` と `jobs` から `application`、`application` から `domain` への依存を許可する。`infrastructure` は `application` または `domain` が定義するインターフェースを実装する。`domain` から他の層を参照しない。

## 6. 命名規則
ディレクトリ名は小文字の英単語、複数語はハイフン区切りとする。ユースケースのファイル名は動詞から始め、業務上の操作と対応させる。

## 7. 設計判断
ADR-003に基づき、技術種別だけでなく業務モジュールも分かる構成とする。

## 8. 未確定事項
- ISSUE-030: 結合テスト用fixtureを機能別に置くか共通管理するか。
````
