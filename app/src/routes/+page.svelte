<script>
	import { user, userData } from '$lib/stores/auth.js';
	import { logOut } from '$lib/firebase/auth.js';

	async function handleLogout() {
		await logOut();
	}
</script>

<svelte:head>
	<title>ダッシュボード - 藤井写真館管理システム</title>
</svelte:head>

<div class="bg-surface-50 min-h-screen">
	<!-- ヘッダー -->
	<header class="bg-surface-100 border-surface-200 border-b shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div>
					<h1 class="text-surface-900 text-xl font-semibold">藤井写真館管理システム</h1>
				</div>

				<div class="flex items-center space-x-4">
					{#if $userData}
						<span class="text-surface-600 text-sm"
							>こんにちは、{$userData.email || $user?.email}</span
						>
					{/if}
					<button on:click={handleLogout} class="btn variant-filled-surface"> ログアウト </button>
				</div>
			</div>
		</div>
	</header>

	<!-- メインコンテンツ -->
	<main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<!-- ウェルカメッセージ -->
		<div class="mb-8">
			<div class="bg-surface-100 rounded-lg p-6">
				<h2 class="text-surface-900 mb-2 text-2xl font-bold">ダッシュボード</h2>
				<p class="text-surface-600">写真館管理システムへようこそ</p>
			</div>
		</div>

		<!-- 統計カード -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div class="bg-surface-100 rounded-lg p-6">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="font-medium text-white">👥</span>
						</div>
					</div>
					<div class="ml-4">
						<dt class="text-surface-500 text-sm font-medium">顧客数</dt>
						<dd class="text-surface-900 text-2xl font-semibold">-</dd>
					</div>
				</div>
			</div>

			<div class="bg-surface-100 rounded-lg p-6">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="bg-secondary-500 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="font-medium text-white">📸</span>
						</div>
					</div>
					<div class="ml-4">
						<dt class="text-surface-500 text-sm font-medium">写真数</dt>
						<dd class="text-surface-900 text-2xl font-semibold">-</dd>
					</div>
				</div>
			</div>

			<div class="bg-surface-100 rounded-lg p-6">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="bg-tertiary-500 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="font-medium text-white">📊</span>
						</div>
					</div>
					<div class="ml-4">
						<dt class="text-surface-500 text-sm font-medium">今月のアップロード</dt>
						<dd class="text-surface-900 text-2xl font-semibold">-</dd>
					</div>
				</div>
			</div>

			<div class="bg-surface-100 rounded-lg p-6">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="bg-success-500 flex h-8 w-8 items-center justify-center rounded-lg">
							<span class="font-medium text-white">✨</span>
						</div>
					</div>
					<div class="ml-4">
						<dt class="text-surface-500 text-sm font-medium">アクティブキャンペーン</dt>
						<dd class="text-surface-900 text-2xl font-semibold">-</dd>
					</div>
				</div>
			</div>
		</div>

		<!-- クイックアクション -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div class="bg-surface-100 rounded-lg p-6">
				<h3 class="text-surface-900 mb-4 text-lg font-medium">顧客管理</h3>
				<p class="text-surface-600 mb-4">顧客の情報を管理し、QRコードを生成します</p>
				<button class="btn variant-filled-primary" disabled> 顧客管理 </button>
			</div>

			<div class="bg-surface-100 rounded-lg p-6">
				<h3 class="text-surface-900 mb-4 text-lg font-medium">写真アップロード</h3>
				<p class="text-surface-600 mb-4">撮影した写真をアップロードして顧客に配信します</p>
				<button class="btn variant-filled-secondary" disabled> 写真アップロード </button>
			</div>

			<div class="bg-surface-100 rounded-lg p-6">
				<h3 class="text-surface-900 mb-4 text-lg font-medium">キャンペーン作成</h3>
				<p class="text-surface-600 mb-4">季節のキャンペーンを作成して顧客に通知します</p>
				<button class="btn variant-filled-tertiary" disabled> キャンペーン作成 </button>
			</div>
		</div>
	</main>
</div>

<style>
	.min-h-screen {
		min-height: 100vh;
	}
</style>
