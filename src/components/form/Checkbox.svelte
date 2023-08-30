<script lang="ts">
	import Icon from '../base/misc/Icon.svelte';

	export let id: string;
	export let name = '';
	export let checked = false;
	export let disabled = false;

	let generatedId = `checkbox-${Math.random().toString(36).substr(2, 10)}`;
	$: id = id || generatedId;
</script>

<button class="group checkbox-container" {disabled}>
	<input type="checkbox" {id} {name} class="visually-hidden" bind:checked {disabled} inert />
	<span class="checkbox" class:checked class:unchecked={!checked} />
	{#if checked}
		<span class="absolute inline-block">
			<slot name="icon" {checked}>
				<Icon name="check" class="checkbox-icon" />
			</slot>
		</span>
	{/if}

	<slot name="label" {id}>
		<label id="{id}-label" for={id} />
	</slot>
</button>

<style lang="postcss">
	.visually-hidden {
		@apply absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none;
		clip: rect(0 0 0 0);
	}
</style>
