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
	on:click={(event) => {
		if (event.target === event.currentTarget) {
			forwardEvent('click', event);
		}
	}}
	on:pointerup={(event) => {
		forwardEvent('pointerup', event);
	}}
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:keyup
	on:keydown
	on:keypress
	{...$$restProps}
	class={'button ' + $$restProps.class}
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
