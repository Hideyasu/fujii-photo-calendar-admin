<script>
	import { signIn } from '$lib/firebase/auth.js';
	import { user } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	// すでにログインしている場合はダッシュボードにリダイレクト
	$effect(() => {
		if ($user) {
			goto('/');
		}
	});

	async function handleSubmit() {
		if (!email || !password) {
			error = 'メールアドレスとパスワードを入力してください';
			return;
		}

		loading = true;
		error = '';

		const { user: loggedInUser, error: signInError } = await signIn(email, password);

		if (signInError) {
			error = getErrorMessage(signInError);
			loading = false;
		} else {
			// ログイン成功時はストアが自動的に更新され、ダッシュボードにリダイレクトされる
			goto('/');
		}
	}

	function getErrorMessage(errorCode) {
		switch (errorCode) {
			case 'auth/user-not-found':
				return 'ユーザーが見つかりません';
			case 'auth/wrong-password':
				return 'パスワードが間違っています';
			case 'auth/invalid-email':
				return 'メールアドレスの形式が正しくありません';
			case 'auth/too-many-requests':
				return 'ログイン試行回数が多すぎます。しばらく待ってから再度お試しください';
			default:
				return 'ログインに失敗しました';
		}
	}
</script>

<svelte:head>
	<title>ログイン - 藤井写真館管理システム</title>
</svelte:head>

<div
	class="from-primary-50 to-secondary-50 flex min-h-screen items-center justify-center bg-gradient-to-br p-4"
>
	<div class="w-full max-w-md">
		<div class="bg-surface-100 rounded-2xl p-8 shadow-xl">
			<!-- ロゴ・ヘッダー -->
			<div class="mb-8 text-center">
				<h1 class="text-surface-900 mb-2 text-3xl font-bold">藤井写真館</h1>
				<p class="text-surface-600">管理システム</p>
			</div>

			<!-- ログインフォーム -->
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- メールアドレス -->
				<div>
					<label for="email" class="text-surface-700 mb-2 block text-sm font-medium">
						メールアドレス
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						disabled={loading}
						class="input w-full"
						placeholder="admin@example.com"
					/>
				</div>

				<!-- パスワード -->
				<div>
					<label for="password" class="text-surface-700 mb-2 block text-sm font-medium">
						パスワード
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						disabled={loading}
						class="input w-full"
						placeholder="パスワードを入力"
					/>
				</div>

				<!-- エラーメッセージ -->
				{#if error}
					<div class="alert variant-filled-error">
						<div class="alert-message">
							<p>{error}</p>
						</div>
					</div>
				{/if}

				<!-- ログインボタン -->
				<button type="submit" disabled={loading} class="btn variant-filled-primary w-full">
					{#if loading}
						<span class="mr-2 animate-spin">⏳</span>
						ログイン中...
					{:else}
						ログイン
					{/if}
				</button>
			</form>

			<!-- デモ用ログイン情報 -->
			<div class="bg-secondary-50 border-secondary-200 mt-6 rounded-lg border p-3 text-center">
				<p class="text-secondary-700 mb-2 text-xs">📝 デモ用ログイン情報</p>
				<p class="text-secondary-600 text-xs">
					メール: <code class="bg-secondary-100 rounded px-1">admin@example.com</code><br />
					パスワード: <code class="bg-secondary-100 rounded px-1">password</code>
				</p>
			</div>

			<!-- パスワードリセット -->
			<div class="mt-6 text-center">
				<p class="text-surface-600 text-sm">パスワードを忘れた場合は管理者にお問い合わせください</p>
			</div>
		</div>
	</div>
</div>

<style>
	/* カスタムスタイル */
	.min-h-screen {
		min-height: 100vh;
	}
</style>
