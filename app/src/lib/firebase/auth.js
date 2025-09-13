import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config.js';

// メール・パスワードでログイン
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// ユーザー登録
export async function signUp(email, password, userData = {}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Firestoreにユーザー情報を保存
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin', // デフォルトで管理者権限
      createdAt: new Date(),
      ...userData
    });
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// ログアウト
export async function logOut() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

// パスワードリセット
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

// ユーザー情報を取得
export async function getUserData(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    } else {
      return { data: null, error: 'User not found' };
    }
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// 認証状態の変更を監視
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}