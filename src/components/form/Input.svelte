<script lang="ts">
	export let disabled: boolean = false;
	export let invalid: boolean | undefined;
	export let type: string = 'text';
	export let min: number | undefined;
	export let max: number | undefined;
	export let id: string;
	export let value: string;

	let generatedId = `checkbox-${Math.random().toString(36).substr(2, 10)}`;
	let className = $$props.class;

	$: {
		delete $$props.class;
	}
</script>

<fieldset
	class={'group input-container ' + className}
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
	<input class="peer input" {...$$props} bind:value />
	<slot name="help">
		{#if type === 'number' && (min || max)}
			<div class="help-text">
				{#if min !== undefined}<span class="">Min: {min}</span> {/if}
				{#if max !== undefined}<span class="">Max: {max}</span> {/if}
			</div>
		{/if}
	</slot>
	<slot name="suffix" />
</fieldset>
