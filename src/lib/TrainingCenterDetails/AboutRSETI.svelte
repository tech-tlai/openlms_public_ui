<script>
	import BreadCrumbs from '$lib/breadCrumbs/BreadCrumbs.svelte';
	import { _ } from 'svelte-i18n';
	export let centerData = {};
	export let rsetiStats = {};
	export let route = '';
	export let params = [];
	export let totalCourses = 0;
</script>

<div class="bg-blue-10 rounded-md px-4 pt-4 pb-4 sm:px-9 sm:pb-12 sm:pt-6 lg:px-[92px]">
	<p class="text-darkGray text-xs mb-6 sm:mb-8"><BreadCrumbs {route} {params} /></p>
	<div class="flex flex-col rounded-lg text-darkGray sm:flex-row sm:justify-between gap-6">
		<div class="flex-1">
			<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
				<div class="border-blue-100 border rounded-full p-2 flex items-center justify-center">
					<img
						src="/learningCentersIcon.svg"
						alt="Learning Center"
						class="w-7 h-7 sm:w-8 sm:h-8 object-contain"
					/>
				</div>
				<div>
					<h1 class="uppercase-headers">{centerData?.name ?? ''}</h1>
					<h2 class="text-sm font-bold text-darkGray">
						{$_('RSETIId')}: {centerData?.extId ?? '-'}
					</h2>
				</div>
			</div>

			<h3 class="text-sm text-darkGray font-semibold mt-6">
				{$_('Address')}:
			</h3>
			<div class="text-sm text-darkGray mb-2">
				<p>{centerData?.address ?? '-'}</p>
				<a
					href={`https://maps.google.com?q=${centerData?.address}`}
					class="underline underline-offset-2 text-primary hover:cursor-pointer"
					target="_blank">View on map</a
				>
			</div>

			<h3 class="text-sm text-darkGray mb-1">
				<span class="font-semibold">
					{$_('Phone')}:
				</span>
				{centerData?.contactNo ?? '-'}
			</h3>
			<h3 class="text-sm text-darkGray mb-1">
				<span class="font-semibold">
					{$_('Email')}:
				</span>
				{centerData?.email ?? '-'}
			</h3>
		</div>

		<div class="flex justify-center sm:items-start gap-4 flex-1">
			<div class="flex-1 rounded-md bg-white p-4 border border-gray-50">
				<h2 class="text-xs sm:text-sm text-darkGray mb-2">
					{$_('TotalCourses')}
				</h2>
				<h3 class="uppercase-body-text">
					{rsetiStats?.totalCourses ?? '-'}
				</h3>
			</div>
			<div class="flex-1 rounded-md bg-white p-4 border border-gray-50">
				<h2 class="text-xs sm:text-sm text-darkGray mb-2">{$_('TotalTrainees')}</h2>
				<h3 class="uppercase-body-text">
					{rsetiStats?.totalTrainees ?? '-'}
				</h3>
			</div>
		</div>
	</div>
</div>
