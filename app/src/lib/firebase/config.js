import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase設定
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebaseアプリを初期化
let app;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // 開発環境では常にエミュレーターに接続
  if (import.meta.env.DEV) {
    console.log('🔧 Firebase エミュレーター使用（開発モード）');
    
    // エミュレーターに接続（一度だけ実行）
    try {
      if (!auth.config.emulator) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        console.log('✅ Auth エミュレーター接続: localhost:9099');
      }
    } catch (e) {
      console.log('Auth エミュレーター接続済み');
    }
    
    try {
      if (!db._settings?.host?.includes('localhost')) {
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('✅ Firestore エミュレーター接続: localhost:8080');
      }
    } catch (e) {
      console.log('Firestore エミュレーター接続済み');
    }
    
    try {
      if (!storage._host?.includes('localhost')) {
        connectStorageEmulator(storage, 'localhost', 9199);
        console.log('✅ Storage エミュレーター接続: localhost:9199');
      }
    } catch (e) {
      console.log('Storage エミュレーター接続済み');
    }
  }
} catch (error) {
  console.error('Firebase初期化エラー:', error);
  
  // エラー時のフォールバック（開発用）
  if (import.meta.env.DEV) {
    console.warn('⚠️ Firebase設定が無効です。デモモードで動作します。');
  }
}

// Firebase サービスをエクスポート
export { auth, db, storage };
export default app;