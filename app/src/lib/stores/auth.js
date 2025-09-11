import { writable } from 'svelte/store';
import { watchAuthState, getUserData } from '../firebase/auth.js';

// 認証状態を管理するストア
export const user = writable(null);
export const loading = writable(true);
export const userData = writable(null);

// 認証状態を初期化
export function initializeAuth() {
  return watchAuthState(async (firebaseUser) => {
    loading.set(true);
    
    if (firebaseUser) {
      // ユーザーがログインしている場合、追加データを取得
      const { data } = await getUserData(firebaseUser.uid);
      user.set(firebaseUser);
      userData.set(data);
    } else {
      // ログアウトしている場合
      user.set(null);
      userData.set(null);
    }
    
    loading.set(false);
  });
}

// ユーザーが管理者かどうかをチェック
export function isAdmin(userDataValue) {
  return userDataValue?.role === 'admin';
}