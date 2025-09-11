# 実装計画: 藤井写真館管理システム

**機能ブランチ**: `001-`  
**仕様ファイル**: `spec.md`  
**作成日**: 2025-09-11  
**ステータス**: 計画中

## 📋 概要

この計画は、顧客写真の管理とカレンダー連携を行うWebベースの管理プラットフォーム「藤井写真館管理システム」の技術実装について説明します。システムはSvelteKitとFirebaseバックエンドサービスを使用して構築され、Vercelにデプロイされます。

## 🏗 アーキテクチャ概要

### 技術スタック
- **フロントエンドフレームワーク**: SvelteKit
- **言語**: JavaScript/TypeScript
- **スタイリング**: Tailwind CSS + Skeleton UI
- **バックエンドサービス**: Firebase (Auth, Firestore, Storage)
- **デプロイ**: Vercel
- **状態管理**: Svelte Stores
- **画像処理**: ブラウザベース圧縮 + Sharp (サーバーサイド)

### システムアーキテクチャ
```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  管理者Webアプリ │────▶│   Vercel     │────▶│    Firebase     │
│   (SvelteKit)   │     │  (ホスティング)│     │  (バックエンド)  │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                      │
                                                      ▼
                                              ┌───────────────┐
                                              │ クライアントアプリ│
                                              │ (カレンダー)    │
                                              └───────────────┘
```

## 📁 プロジェクト構造

```
fujii-photo-calendar-admin/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # メインレイアウト（ナビゲーション付き）
│   │   ├── +page.svelte            # ダッシュボード
│   │   ├── login/
│   │   │   └── +page.svelte        # ログインページ
│   │   ├── customers/
│   │   │   ├── +page.svelte        # 顧客一覧
│   │   │   └── [id]/
│   │   │       └── +page.svelte    # 顧客詳細
│   │   ├── photos/
│   │   │   └── +page.svelte        # 写真管理
│   │   └── campaigns/
│   │       └── +page.svelte        # キャンペーン管理
│   ├── lib/
│   │   ├── components/
│   │   │   ├── PhotoUploader.svelte
│   │   │   ├── CustomerCard.svelte
│   │   │   └── StatsWidget.svelte
│   │   ├── stores/
│   │   │   ├── auth.js
│   │   │   └── photos.js
│   │   ├── firebase/
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   └── storage.js
│   │   └── utils/
│   │       ├── imageCompression.js
│   │       └── qrcode.js
│   ├── app.html
│   └── app.css
├── static/
├── tests/
└── package.json
```

## 🎯 実装フェーズ

### フェーズ1: 基盤構築（第1週）
**目標**: プロジェクトインフラと認証のセットアップ

#### タスク:
- [ ] TypeScriptでSvelteKitプロジェクトを初期化
- [ ] Tailwind CSSとSkeleton UIを設定
- [ ] Firebaseプロジェクトのセットアップとサービス設定
- [ ] Firebase認証の実装
- [ ] フォームバリデーション付きログインページの作成
- [ ] 保護されたルートと認証ガードの設定
- [ ] Vercelデプロイの設定
- [ ] ナビゲーション付き基本レイアウトの作成

**成果物**: 動作する認証機能を持つスケルトンアプリのデプロイ

### フェーズ2: 顧客管理（第2週）
**目標**: 基本的な顧客CRUD操作の実装

#### タスク:
- [ ] 顧客用Firestoreデータスキーマの設計
- [ ] 検索/フィルター付き顧客一覧ページの作成
- [ ] 顧客作成フォームの実装
- [ ] 顧客詳細ビューの追加
- [ ] 顧客用QRコードの生成と表示
- [ ] 顧客編集機能の実装
- [ ] 確認付き顧客削除の追加
- [ ] 顧客統計表示の作成

**成果物**: 完全な顧客管理機能

### フェーズ3: 写真管理（第3-4週）
**目標**: 写真アップロードと管理システムの構築

#### タスク:
- [ ] ドラッグ&ドロップ写真アップローダーの実装
- [ ] クライアントサイド画像圧縮の追加
- [ ] Firebase Storage統合の作成
- [ ] 遅延読み込み付き写真ギャラリービューの構築
- [ ] 写真-顧客関連付けの実装
- [ ] 写真メタデータ編集（タイトル、日付、メモ）の追加
- [ ] 一括選択と操作の作成
- [ ] 写真削除の実装
- [ ] アップロード進捗インジケーターの追加

**成果物**: 一括操作を含む完全な写真管理機能

### フェーズ4: ダッシュボードと分析（第5週）
**目標**: 管理ダッシュボードの作成

#### タスク:
- [ ] ダッシュボードレイアウトの設計
- [ ] 統計ウィジェット（顧客数、写真数）の作成
- [ ] 最近のアクティビティフィードの実装
- [ ] クイックアクションボタンの追加
- [ ] データ可視化チャートの作成
- [ ] 通知センターの構築
- [ ] 監査ログビューアーの実装

**成果物**: 主要メトリクスを含む情報豊富なダッシュボード

### フェーズ5: キャンペーン管理（第6週）
**目標**: キャンペーン作成と配信の構築

#### タスク:
- [ ] キャンペーンデータモデルの設計
- [ ] キャンペーン一覧ビューの作成
- [ ] キャンペーン作成フォームの実装
- [ ] ターゲティング用顧客選択の追加
- [ ] キャンペーンプレビューの構築
- [ ] キャンペーンスケジューリングの実装
- [ ] 通知配信システムの追加

**成果物**: キャンペーン管理システム

### フェーズ6: 仕上げと最適化（第7週）
**目標**: UXの改善とパフォーマンスの最適化

#### タスク:
- [ ] エラーハンドリングとリカバリーの実装
- [ ] ローディング状態とスケルトンの追加
- [ ] CDNによる画像読み込みの最適化
- [ ] オフラインサポートの実装
- [ ] 包括的なフォームバリデーションの追加
- [ ] ヘルプドキュメントの作成
- [ ] アクセシビリティ監査の実施
- [ ] バンドルサイズの最適化

**成果物**: 本番環境対応アプリケーション

## 🔧 技術実装詳細

### Firebase設定

```javascript
// lib/firebase/config.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

### Firestoreスキーマ

```javascript
// コレクション構造
{
  users: {
    [userId]: {
      email: string,
      name: string,
      role: 'admin' | 'customer',
      createdAt: timestamp,
      lastVisit: timestamp,
      phoneNumber: string,
      qrCode: string,
      metadata: {
        photoCount: number,
        viewerCount: number
      }
    }
  },
  
  photos: {
    [photoId]: {
      url: string,
      thumbnailUrl: string,
      customerId: string,
      title: string,
      description: string,
      shootingDate: timestamp,
      uploadedAt: timestamp,
      uploadedBy: string,
      size: number,
      metadata: {
        width: number,
        height: number,
        displayPriority: number
      }
    }
  },
  
  campaigns: {
    [campaignId]: {
      title: string,
      content: string,
      targetCustomers: string[],
      startDate: timestamp,
      endDate: timestamp,
      createdBy: string,
      status: 'draft' | 'active' | 'completed'
    }
  },
  
  auditLogs: {
    [logId]: {
      action: string,
      userId: string,
      targetId: string,
      timestamp: timestamp,
      details: object
    }
  }
}
```

### セキュリティルール

```javascript
// Firestoreセキュリティルール
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 認証された管理者のみ読み書き可能
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /photos/{photoId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /campaigns/{campaignId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /auditLogs/{logId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }
  }
}
```

## 🧪 テスト戦略

### 単体テスト
- Vitestによるコンポーネントテスト
- ストアロジックのテスト
- ユーティリティ関数のテスト

### 統合テスト
- Firebase認証フロー
- 写真アップロードプロセス
- 顧客CRUD操作

### E2Eテスト
- Playwrightによる完全なユーザージャーニー
- クロスブラウザテスト
- モバイルレスポンシブテスト

## 📊 成功指標

### パフォーマンス目標
- 初期読み込み時間: 3秒未満
- 画像アップロード: 10枚で5秒未満
- 検索レスポンス: 500ms未満
- Lighthouseスコア: 90以上

### 機能指標
- アップロード中のデータ損失ゼロ
- 稼働率99.9%
- 通知配信成功率95%以上

## 🚀 デプロイ戦略

### 環境設定
1. **開発環境**: Firebaseエミュレータを使用したローカル開発
2. **ステージング環境**: PR時のVercelプレビューデプロイ
3. **本番環境**: mainブランチからVercelへの自動デプロイ

### CI/CDパイプライン
```yaml
# .github/workflows/deploy.yml
- PR時にビルドとテスト
- Vercelへプレビューデプロイ
- E2Eテストの実行
- mainへのマージで本番デプロイトリガー
```

## ⚠️ リスク軽減

### 識別されたリスク
1. **大容量ファイルアップロード**: チャンクアップロードと圧縮の実装
2. **同時編集**: Firestoreトランザクションの使用
3. **認証の問題**: リフレッシュトークン戦略の実装
4. **ネットワーク障害**: サービスワーカーによるオフラインサポートの追加

## 📝 次のステップ

1. 技術アプローチについてステークホルダーの承認を得る
2. 開発環境のセットアップ
3. Firebaseプロジェクトの作成とサービス設定
4. SvelteKitプロジェクトの初期化
5. フェーズ1の実装開始

## 🔄 メンテナンス計画

### 定期タスク
- 週次セキュリティアップデート
- 月次パフォーマンス監査
- 四半期機能レビュー
- 年次セキュリティ評価

### モニタリング
- パフォーマンス: Vercel Analytics
- 使用状況: Firebase Analytics
- エラー追跡: Sentry
- ビジネスメトリクス: カスタムダッシュボード

---

**実装開始準備完了**: この計画は藤井写真館管理システム構築のための明確なロードマップを提供します。各フェーズは前のフェーズを基に構築され、完全なソリューションに向けて着実な進捗を確保します。