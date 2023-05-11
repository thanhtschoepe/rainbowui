<script>
	import Icon from '../base/misc/Icon.svelte';

	export let id = '';
	export let name = '';
	export let checked = false;
	export let disabled = false;
</script>

<fieldset
	tabindex="0"
	class="relative flex items-center outline-none group disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
	{disabled}
>
	<input type="checkbox" {id} {name} class="hidden" bind:checked {disabled} />
	<label for={id} class="inline-flex items-center cursor-pointer">
		{#if checked}
			<span class="absolute inline-block">
				<slot name="icon" {checked}>
					<Icon name="check" class="stroke-2 stroke-green-400 animate-draw" />
				</slot>
			</span>
		{/if}
		<span
			class="backlight transition-all duration-100 ease-out group-hover:scale-125 inline-block w-5 h-5 mr-2 rounded-[0.5rem] bg-dark-4"
			class:checked
			class:not-checked={!checked}
		/>
		<span class="text-dark dark:text-light">
			<slot name="label" />
		</span></label
	>
</fieldset>

<style lang="postcss">
	.checked {
		@apply backlight-full backlight-success bg-green-400/20;
	}
	.not-checked {
		@apply backlight-for-focus group-focus:backlight-rainbow group-focus-visible:backlight-rainbow group-focus-visible:backlight-full;
	}
</style>
