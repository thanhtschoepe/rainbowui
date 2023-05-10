<script lang="ts">
	import Icon, { icons } from '../misc/Icon.svelte';
	import Button from '../button/Button.svelte';

	let copiedStatus: Record<IconName, 'INITIAL' | 'SUCCESS'> = {};
	const copy = (iconName) => {
		navigator.clipboard.writeText(iconName);
		copiedStatus[iconName] = 'SUCCESS';
	};
</script>

<h2 class="typo-h2">Iconography</h2>
<div class="grid grid-cols-4 gap-4 lg:grid-cols-6">
	{#each icons as icon (icon)}
		<div>
			<Button
				networkStatus={copiedStatus[icon] ?? 'INITIAL'}
				variant="icon"
				on:pointerup={() => copy(icon)}
				class={'flex flex-col items-center mx-auto ' +
					(copiedStatus[icon] === 'SUCCESS' ? 'text-success' : '')}
				let:networkStatus
			>
				<Icon name={networkStatus === 'SUCCESS' ? 'check-square' : icon} class="w-6 h-6" />
				<p class="pt-2 typo-caption text-dark-1">{icon}</p>
			</Button>
		</div>
	{/each}
</div>
