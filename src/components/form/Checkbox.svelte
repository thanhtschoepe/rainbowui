<script lang="ts">
	import Icon from '../base/misc/Icon.svelte';

	export let id: string;
	export let name = '';
	export let checked = false;
	export let disabled = false;

	let generatedId = `checkbox-${Math.random().toString(36).substr(2, 10)}`;
	$: id = id || generatedId;
</script>

<div
	class="relative flex items-center outline-none group disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
	{disabled}
>
	<input
		type="checkbox"
		{id}
		{name}
		class="visually-hidden"
		bind:checked
		{disabled}
		aria-labelledby="{id}-label"
	/>
	<label for={id} class="inline-flex items-center cursor-pointer">
		<span
			class="backlight transition-all duration-100 ease-out group-hover:scale-125 inline-block w-5 h-5 mr-2 rounded-[0.5rem] bg-dark-4 dark:bg-light-4"
			class:checked
			class:not-checked={!checked}
		/>
		{#if checked}
			<span class="absolute inline-block">
				<slot name="icon" {checked}>
					<Icon name="check" class="stroke-2 stroke-dark-1 animate-draw" />
				</slot>
			</span>
		{/if}
		<span id="{id}-label" class="text-dark dark:text-light">
			<slot name="label" for={id} />
		</span>
	</label>
</div>

<style lang="postcss">
	.checked {
		@apply after:-inset-2 group-focus-within:backlight-rainbow backlight-success bg-green-400/50;
	}
	.not-checked {
		@apply backlight-for-focus backlight-rainbow after:-inset-2;
	}
	.visually-hidden {
		@apply absolute w-0 h-0 overflow-hidden;
		clip: rect(0 0 0 0);
	}
</style>
