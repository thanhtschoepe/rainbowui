<!-- Button.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	export let variant: 'default' | 'icon' | 'emphasis' = 'default';
	export let networkStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INITIAL';
	export let revertDuration: number = 3000; // Default revert duration in milliseconds

	let localNetworkStatus = networkStatus;
	$: {
		localNetworkStatus = networkStatus;
	}

	const dispatch = createEventDispatcher();
	let timeoutId: ReturnType<typeof setTimeout>;

	function forwardEvent(type: string, event: Event) {
		if (localNetworkStatus !== 'PENDING' || type === 'blur' || type === 'focus') {
			dispatch(type, event);
		}
	}

	function updateNetworkStatus() {
		if (localNetworkStatus === 'SUCCESS' || localNetworkStatus === 'ERROR') {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				localNetworkStatus = 'INITIAL';
			}, revertDuration);
		}
	}

	onMount(updateNetworkStatus);
	afterUpdate(updateNetworkStatus);
	onDestroy(() => clearTimeout(timeoutId));
</script>

<button
	on:blur
	on:focus
	on:pointerdown
	on:pointerup={(event) => {
		if (event.target === event.currentTarget) {
			forwardEvent('click', event);
		} else {
			forwardEvent('pointerup', event);
		}
	}}
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:keyup
	on:keydown
	on:keypress
	{...$$restProps}
	class={'transition-all duration-150 backlight hover:shadow-lg outline-none relative inline-flex gap-2 items-center rounded-xs typo-body2 text-dark dark:text-light disabled:opacity-50 disabled:pointer-events-none ' +
		$$restProps.class}
	class:variant-default={variant === 'default'}
	class:variant-icon={variant === 'icon'}
	class:status-pending={localNetworkStatus === 'PENDING'}
	class:status-success={localNetworkStatus === 'SUCCESS'}
	class:status-error={localNetworkStatus === 'ERROR'}
	class:status-initial={localNetworkStatus === 'INITIAL'}
	aria-disabled={localNetworkStatus === 'PENDING'}
>
	<slot networkStatus={localNetworkStatus} />
</button>

<style lang="postcss">
	.variant-default {
		@apply px-4 py-3 bg-dark-4 dark:bg-light-3 hover:bg-dark-3 dark:hover:bg-light-2 focus:bg-dark-3;
	}
	.variant-icon {
		@apply p-3 hover:bg-dark-4 dark:hover:bg-light-2 focus:bg-dark-4;
	}
	.status-initial {
		@apply backlight-for-focus focus:backlight-corner-br focus:after:bg-gradient-rainbow;
	}
	.status-pending {
		@apply backlight-full pointer-events-none after:bg-gradient-rainbow after:animate-glow-pulse;
	}
	.status-success {
		@apply backlight-full backlight-success after:animate-shutdown backlight-full-sm;
	}
	.status-error {
		@apply backlight-full animate-shake backlight-danger after:animate-shutdown backlight-full-sm direction-animation-reverse;
	}
</style>
