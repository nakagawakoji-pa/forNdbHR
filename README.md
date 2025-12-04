-----

# [New Feature] 社員スキル検索・マッチングシステム (MVP) 開発

## 1\. 概要

社員のスキルを可視化し、プロジェクトやポジションに最適な人材を検索できるWebアプリケーションのMVP（Minimum Viable Product）を開発します。
従来のキーワード検索だけでなく、**「スキルの重み付け（優先度）」をスライダーで調整し、リアルタイムにマッチ度を計算・並べ替えができるインターフェース**を構築します。

**参考イメージ:**

  - [添付のデモ動画を参照]
  - コア機能: 自然言語による要件抽出、パラスメトリック検索、レーダーチャートによる可視化

## 2\. 技術スタック (推奨)

開発効率とパフォーマンス（UIの追従性）を重視し、以下の構成を想定しています。

  * **Framework:** Next.js (App Router) / TypeScript
  * **Styling:** Tailwind CSS
  * **UI Components:** shadcn/ui (Radix UI base) - スライダー、カード等の構築に使用
  * **Charts:** Recharts - レーダーチャートの描画に使用
  * **Icons:** Lucide React
  * **State Management:** React Hooks (useState, useMemo) - サーバーを経由せずフロントエンドで高速に計算

## 3\. 機能要件

### A. 検索サイドバー (左カラム)

  - **自然言語検索エリア:**
      - 任意の文章（例: 「IOWN APNに関わるPMを探している」）を入力可能。
      - （Phase 1ではモック、Phase 2でOpenAI API等を用いて文章からスキルタグと重みを自動抽出する機能を実装予定）
  - **必要スキル・重み付け設定:**
      - スキルごとにスライダー（0〜100% または 0〜5段階）を表示。
      - ユーザーがスライダーを操作すると、即座に右側の検索結果に反映されること。

### B. 検索結果リスト (右メインエリア)

  - **リアルタイムソート:**
      - 設定された重みに基づき「マッチ度（%）」が高い順に社員カードを並べ替え。
  - **社員カード表示:**
      - 基本情報（名前、部署、役職、タグ）。
      - **マッチ度スコア:** 目立つように大きく表示。
      - **レーダーチャート:**
          - 対象社員のスキルバランスを表示。
          - 検索条件（要求レベル）と社員の実力値の比較ができるとなお良い。

## 4\. マッチング・計算ロジック

フロントエンド側で以下のロジックを用いて動的に算出します。

$$MatchScore = \frac{\sum (EmployeeSkillValue \times UserWeight)}{\sum (MaxSkillValue \times UserWeight)} \times 100$$

  - **UserWeight:** ユーザーがスライダーで設定した値 (0-100)
  - **EmployeeSkillValue:** 社員が保有する該当スキルのレベル (0-100)
  - **MaxSkillValue:** スキルの満点値 (100)
  - ※ `UserWeight` が `0` の項目は計算から除外する。

## 5\. データ構造案 (TypeScript Interface)

```typescript
interface Skill {
  key: string;       // ex: 'iown', 'pm'
  label: string;     // ex: 'IOWN APN', 'プロジェクトマネジメント'
}

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  description: string;
  avatarUrl?: string;
  skills: {
    [key: string]: number; // keyはSkillのkeyと対応, 値は0-100
  };
}
```

## 6\. 実装リファレンス (プロトタイプ)

UIの挙動とロジックのベースとなるReactコードは以下を参照のこと。
（※ここに先ほどのコードをリンク、またはファイルとして添付してください）

## 7\. タスクリスト

  - [ ] Next.js プロジェクトのセットアップ (Tailwind, shadcn/ui導入)
  - [ ] レイアウト構築 (2カラム構成: サイドバー固定、メインエリアスクロール)
  - [ ] ダミーデータの定義 (JSON)
  - [ ] Recharts を用いたレーダーチャートコンポーネントの実装
  - [ ] マッチング計算ロジックの実装 (useMemo使用)
  - [ ] スライダー操作とリスト並べ替えの連動実装
  - [ ] (Option) レスポンシブ対応

-----
