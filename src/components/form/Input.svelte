<script lang="ts">
	import Icon from '../base/misc/Icon.svelte';
</script>

<fieldset
	class={'group inline-flex gap-2 items-center px-4 py-2 backlight backlight-corner-br dark:bg-light-5 rounded typo-body text-dark disabled:pointer-events-none disabled:opacity-50 after:opacity-0 focus-within:after:opacity-100'}
	disabled={$$props.disabled}
	invalid={$$props.invalid}
	class:invalid={$$props.invalid}
	class:valid={!$$props.invalid}
	class:validity-unset={$$props.invalid === undefined}
>
	<slot name="prefix" />
	<input
		class="bg-transparent border-none outline-none peer spin-button-hidden out-of-range:animate-shake min-w-[10rem]"
		class:text-red-400={$$props.invalid}
		{...$$props}
	/>
	<slot name="help">
		{#if $$props.type === 'number' && ($$props.min || $$props.max)}
			<div
				class="absolute left-2 -bottom-5 typo-caption peer-in-range:text-dark-1 peer-out-of-range:text-gradient peer-out-of-range:bg-gradient-danger"
			>
				{#if $$props.min !== undefined}<span class="">Min: {$$props.min}</span> {/if}
				{#if $$props.min !== undefined}<span class="">Max: {$$props.max}</span> {/if}
			</div>
		{/if}
	</slot>
	<slot name="suffix" />
</fieldset>

<style lang="postcss">
	.invalid {
		@apply focus-within:after:bg-gradient-danger bg-red-700/10;
	}
	.valid {
		@apply focus-within:after:bg-gradient-success bg-lime-700/10;
	}
	.validity-unset {
		@apply focus-within:after:bg-gradient-rainbow bg-dark-5;
	}
</style>
