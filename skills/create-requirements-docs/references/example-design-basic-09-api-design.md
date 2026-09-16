# 完全例: API設計

架空の「社内経費精算システム」を題材に、主要部分の記載例を示す。例の契約を実案件へ転用しない。

## design/basic/09-api-design.md

````markdown
---
title: API設計
status: in-review
owner: 開発責任者
reviewers: [フロントエンド責任者, セキュリティ責任者]
last_updated: 2026-08-31
---

# API設計

## 1. 文書の目的と対象
Webクライアントへ提供する経費申請APIの契約を定義する。会計システムとの接続は `04-external-system-integration-design.md`、アプリケーション内部の呼出方法は詳細設計を正本とする。

## 2. 入力となる要件・設計
FR-001、FR-002、DR-001、NFR-002、`03-data-design.md`、`07-security-design.md`を入力とする。

## 3. 共通方針
HTTPS上のJSON APIとし、ベースパスを `/api/v1` とする。日時はUTCのRFC 3339形式、金額は整数の円で表現する。認証方式と認可規則は `10-authentication-and-authorization-design.md` を正本とする。

## 4. API一覧

| API ID | 利用者 | 目的 | メソッド | パス | 認証・認可 | 関連要件 |
|---|---|---|---|---|---|---|
| API-001 | 申請者 | 経費申請を作成する | POST | `/expenses` | 申請者 | FR-001 |
| API-002 | 申請者、経理担当者 | 経費申請を参照する | GET | `/expenses/{expenseId}` | 本人または経理担当者 | FR-002 |

## 5. API契約

### API-001 経費申請作成

#### リクエスト

```json
{
  "expenseDate": "2026-08-30",
  "amountYen": 1280,
  "categoryId": "transport",
  "description": "顧客訪問"
}
```

#### 成功レスポンス
`201 Created`を返し、`Location`ヘッダーへ作成した申請のURLを設定する。

```json
{
  "expenseId": "exp_01JABCDEF",
  "status": "draft",
  "version": 1
}
```

#### エラーレスポンス
入力不正は `400`、認証なしは `401`、権限不足は `403`、重複した冪等キーは同じ作成結果を返す。

## 6. エラー形式

```json
{
  "code": "INVALID_ARGUMENT",
  "message": "入力内容を確認してください",
  "fieldErrors": [{"field": "amountYen", "reason": "must_be_positive"}],
  "traceId": "01JTRACE"
}
```

## 7. 一覧取得・検索
一覧APIはカーソル方式とし、`limit` は既定50件、最大100件とする。同一カーソル内では申請日時の降順を維持する。

## 8. 冪等性・並行更新・再試行
作成APIは `Idempotency-Key` を必須とする。更新APIは `version` による楽観的ロックを行い、競合時は `409 Conflict` を返す。

## 9. 制限と非機能条件
JSON本文は1 MiB以下とする。通常時の応答時間はNFR-002を参照する。認証主体、API ID、対象ID、結果、trace IDを監査ログへ記録する。

## 10. 変更・廃止方針
後方互換な項目追加は同一バージョンで行う。必須項目の追加、意味変更、削除は新しいメジャーバージョンとし、旧版の廃止日は利用者へ事前通知する。

## 11. 設計判断と未確定事項
- ADR-006: 一覧APIにカーソル方式を採用する。
- ISSUE-031: API仕様の正本をOpenAPIファイルと本書のどちらにするか。
````
