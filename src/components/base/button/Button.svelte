<!-- Button.svelte -->
<script lang="ts">
	import type { ActionArray } from 'core/infra/forwardActions.ts';
	import { createEventDispatcher } from 'svelte';
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { useActions } from '~/core/infra/forwardActions.ts';

	export let variant: 'default' | 'icon' = 'default';
	export let networkStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INITIAL';
	export let revertDuration: number = 3000; // Default revert duration in milliseconds
	export let label: string | undefined = undefined;
	export let actions: ActionArray = [];

	if (variant === 'icon' && !label) {
		console.warn('Icon buttons should have a label');
	}

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
	on:click
	on:pointerup={(event) => {
		forwardEvent('pointerup', event);
	}}
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:keyup
	on:keydown
	on:keypress
	use:useActions={actions}
	{...$$restProps}
	class={`button ${$$props.class || ''}`}
	class:variant-default={variant === 'default'}
	class:variant-icon={variant === 'icon'}
	class:status-pending={localNetworkStatus === 'PENDING'}
	class:status-success={localNetworkStatus === 'SUCCESS'}
	class:status-error={localNetworkStatus === 'ERROR'}
	class:status-initial={localNetworkStatus === 'INITIAL'}
	aria-disabled={localNetworkStatus === 'PENDING'}
	aria-label={label}
>
	<slot networkStatus={localNetworkStatus} />
</button>
