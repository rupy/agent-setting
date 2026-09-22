# 複数ページHTMLサイトの作成

## 標準構成

`assets/site/` はそのままローカルで開ける、独立したHTMLテンプレートサイト。Markdown版の34文書に対応する本文・表・記入例・Mermaid図を収録する。Markdown版スキル、Node.js、サーバーは閲覧・通常の文書作成には不要。

- `index.html`: 全文書への入口。
- `requirements/index.html`、`01-*.html`〜`10-*.html`、`appendices/*.html`: 16文書。競合調査、用語、仮定・制約、決定、未確定事項を含む。
- `design/index.html`、`basic/*.html`、`detailed/*.html`、`detailed/data/*.html`、`detailed/modules/*.html`、`decisions/*.html`: 17文書。API、認証認可、セキュリティ、移行、共通UI、ディレクトリ構成、データストア、モジュール、ADRを独立させる。
- `planning/development-plan.html`: 開発計画1文書。
- `shared/site.css`、`shared/site.js`、`shared/diagrams/*.svg`: サイト共通の表示・文書名検索・図。
- `manifest.json`: 元テンプレートとHTMLページの対応、元ファイルのSHA-256、見出し、図の一覧。実案件へ適用後は対応情報を更新するか削除し、古い元ファイルとの同一性を主張しない。

`assets/requirements.html`、`design.html`、`planning.html` は初期の簡略単ページ版。互換性のため残すが、新規作成の標準に使わない。

## ページ作成・更新

必要なHTMLページと `shared/` を出力先へコピーして編集する。テンプレートをコピーしただけで実案件の文書を完成扱いしない。テンプレート一覧サイトを求められた場合は参考例を残してよいが、その旨を全ページに示す。

共通サイトメニュー、現在ページの `aria-current="page"`、パンくず、ページ内目次、前後ページを保持する。要件だけの案件に設計・計画を勝手に追加せず、採用したページだけでこれらのリンクを再構成する。本文の項目は内容の妥当性を検討して適用し、表示を短くするためだけに減らさない。

通常の `<a href="相対パス.html#ID">` で移動する。`file://` でもリンク、CSS、JS、SVGが読めるようにし、`fetch`、ES modules、CDN、SPAルーターを閲覧の前提にしない。深い階層のページを直接開いても表示され、ブラウザの戻る・進むが使える構成とする。

文書名検索はメニューの候補だけを絞り、本文・印刷内容を隠さない。全文検索や機能カテゴリ検索とは区別して表示する。JavaScript無効時にも目次・本文・図・ページ遷移が使えること。

各ページの `[data-reference-example]` 内には参考例がある。実案件へ適用するときはこの要素、参考例への目次リンク、`.guide` の記入案内を除き、本文を案件固有の内容にする。テンプレートと例の同名IDは `FR-001` と `example-FR-001` のように区別されている。例を実データへ転用せず、実案件のIDを安定させる。

要求の正本ページへ相対リンクを張る。`#FR-001` は同じページ内だけに用い、別ページからは `../07-functional-requirements.html#FR-001` のようにする。例の未定義IDに対して勝手に内容を補完しない。

Mermaidは各ページ内のソースと描画済みSVGを一体で管理する。図の意味を変えたら両方を更新する。描画だけに情報を閉じ込めず、本文・表の名称・役割・分岐と一致させる。

## 保守用の再生成

`scripts/build_site.cjs` は、このリポジトリでMarkdown版から初期移植・明示的な再同期を行うための保守用ツール。通常のHTML作成には使わず、独立編集したHTMLを無断で再生成しない。未使用の出力ディレクトリを指定し、差分を確認してから採用する。

保守環境に `markdown-it`、`mermaid`、`playwright-core` とChromiumが必要。必要に応じて依存を一時ディレクトリへ導入し、`NODE_PATH` で参照する。`CHROMIUM_PATH` でブラウザを指定できる。日本語フォントも確認する。

```sh
node scripts/build_site.cjs /path/to/create-requirements-docs/assets /path/to/new-site
python3 scripts/check_html.py --template /path/to/new-site
node scripts/test_site.cjs /path/to/new-site /path/to/create-requirements-docs/assets
```

再生成時は全文の見出し・表・コード・参考例と元文書の対応を検査する。HTML側で独立編集した場合は、元Markdownとの完全一致テストではなく、変更後の要求・ページ一覧を根拠に検証する。ブラウザではトップ・深い階層・文書間参照、390px／1280px、戻る操作、キーボード、検索の0件・解除、JS無効、印刷を確認する。
