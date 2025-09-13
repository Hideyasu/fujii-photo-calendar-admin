<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { initializeAuth, user, loading } from '$lib/stores/auth.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children } = $props();

	// 認証状態の初期化
	onMount(() => {
		const unsubscribe = initializeAuth();
		return unsubscribe;
	});

	// 認証が必要なルートの保護
	$effect(() => {
		if (!$loading && !$user && $page.url.pathname !== '/login') {
			goto('/login');
		}
	});

	// ログイン済みの場合、ログインページからダッシュボードにリダイレクト
	$effect(() => {
		if (!$loading && $user && $page.url.pathname === '/login') {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>藤井写真館管理システム</title>
	<meta name="description" content="写真館の顧客管理とカレンダー連携システム" />
</svelte:head>

<!-- ローディング画面 -->
{#if $loading}
	<div class="bg-surface-50 flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div
				class="border-primary-500 mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"
			></div>
			<p class="text-surface-600">読み込み中...</p>
		</div>
	</div>
{:else}
	{@render children?.()}
{/if}

<style>
	.min-h-screen {
		min-height: 100vh;
	}
</style>
