<!-- Button.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	export let variant: 'default' | 'icon' | 'emphasis' = 'default';
	export let networkStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INITIAL';
	export let revertDuration: number = 3000; // Default revert duration in milliseconds

	const dispatch = createEventDispatcher();
	let timeoutId: ReturnType<typeof setTimeout>;

	function forwardEvent(type: string, event: Event) {
		if (networkStatus !== 'PENDING' || type === 'blur' || type === 'focus') {
			dispatch(type, event);
		}
	}

	function updateNetworkStatus() {
		if (networkStatus === 'SUCCESS' || networkStatus === 'ERROR') {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				networkStatus = 'INITIAL';
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
	class={'backlight backlight-off relative inline-flex gap-2 items-center rounded-xs typo-body2 text-dark dark:text-light focus:outline-none focus:ring focus:ring-dark-2 focus:dark:ring-light-1 disabled:opacity-50 disabled:pointer-events-none' +
		$$restProps.class}
	class:variant-default={variant === 'default'}
	class:variant-icon={variant === 'icon'}
	class:backlight-off={networkStatus === 'INITIAL'}
	class:status-pending={networkStatus === 'PENDING'}
	class:status-success={networkStatus === 'SUCCESS'}
	class:status-error={networkStatus === 'ERROR'}
	aria-disabled={networkStatus === 'PENDING'}
>
	<slot {networkStatus} />
</button>

<style lang="postcss">
	.variant-default {
		@apply px-4 py-3 bg-dark-4 dark:bg-light-3 hover:bg-dark-3 dark:hover:bg-light-2;
	}
	.variant-icon {
		@apply p-3 hover:bg-dark-4 dark:hover:bg-light-2 focus:bg-dark-4;
	}
	.status-pending {
		@apply backlight-on pointer-events-none backlight-rainbow after:animate-glow-pulse;
	}
	.status-success {
		@apply backlight-on backlight-success after:animate-shutdown backlight-sm;
	}
	.status-error {
		@apply backlight-on backlight-danger after:animate-shutdown backlight-sm;
	}
</style>
