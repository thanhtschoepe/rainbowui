<!-- Button.svelte -->
<script lang="ts">
	import type { ActionArray } from 'core/infra/forwardActions.ts';
	import { onDestroy } from 'svelte';
	import { useActions } from '~/core/infra/forwardActions.ts';

	export let variant: 'default' | 'icon' = 'default';
	export let networkStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INITIAL';
	export let revertDuration: number = 3000; // Default revert duration in milliseconds
	export let label: string | undefined = undefined;
	export let actions: ActionArray = [];
	export let disabled: boolean = false;

	if (variant === 'icon' && !label) {
		console.warn('Icon buttons should have a label');
	}

	let localNetworkStatus = networkStatus;
	let timeoutId: ReturnType<typeof setTimeout>;

	$: {
		localNetworkStatus = networkStatus;
		if (networkStatus === 'SUCCESS' || networkStatus === 'ERROR') {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				localNetworkStatus = 'INITIAL';
			}, revertDuration);
		}
	}
	$: computedDisabled = disabled || localNetworkStatus === 'PENDING';

	onDestroy(() => clearTimeout(timeoutId));
</script>

<button
	on:blur
	on:focus
	on:pointerdown
	on:select
	on:pointerup
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:keyup
	on:keydown
	on:keypress
	on:click
	use:useActions={actions}
	{...$$restProps}
	disabled={computedDisabled}
	class={`button ${$$props.class || ''}`}
	class:variant-default={variant === 'default'}
	class:variant-icon={variant === 'icon'}
	class:status-pending={localNetworkStatus === 'PENDING'}
	class:status-success={localNetworkStatus === 'SUCCESS'}
	class:status-error={localNetworkStatus === 'ERROR'}
	class:status-initial={localNetworkStatus === 'INITIAL'}
	aria-disabled={computedDisabled}
	aria-label={label}
>
	<slot networkStatus={localNetworkStatus} />
</button>
