<script lang="ts">
	export let disabled: boolean = false;
	export let invalid: boolean | undefined;
	export let type: string = 'text';
	export let min: number | undefined;
	export let max: number | undefined;
	export let id: string;

	let generatedId = `checkbox-${Math.random().toString(36).substr(2, 10)}`;
	let className = $$props.class;

	$: {
		delete $$props.class;
	}
</script>

<fieldset
	class={'group relative inline-flex gap-2 items-center px-4 py-2 backlight backlight-corner-br dark:bg-light-5 rounded typo-body text-dark disabled:pointer-events-none disabled:opacity-50 after:opacity-0 focus-within:after:opacity-100 focus-within:shadow-inner ' +
		className}
	{disabled}
	class:invalid
	class:valid={!invalid}
	class:validity-unset={invalid === undefined}
>
	{#if $$slots.label}
		<span class="absolute -top-5 left-1 typo-caption">
			<slot name="label" for={id} />
		</span>
	{/if}
	<slot name="prefix" />
	<input
		class="bg-transparent border-none outline-none peer spin-button-hidden out-of-range:animate-shake min-w-[10rem] invalid:text-red-400"
		{...$$props}
	/>
	<slot name="help">
		{#if type === 'number' && (min || max)}
			<div
				class="absolute left-2 -bottom-5 typo-caption peer-in-range:text-dark-1 peer-out-of-range:text-gradient peer-out-of-range:bg-gradient-danger"
			>
				{#if min !== undefined}<span class="">Min: {min}</span> {/if}
				{#if max !== undefined}<span class="">Max: {max}</span> {/if}
			</div>
		{/if}
	</slot>
	<slot name="suffix" />
</fieldset>

<style lang="postcss">
	.invalid {
		@apply backlight-danger bg-red-700/10;
	}
	.valid {
		@apply backlight-success bg-lime-700/10;
	}
	.validity-unset {
		@apply backlight-rainbow bg-dark-5;
	}
</style>
