<script>
	export let required = false;
</script>

<label for={$$props.for} class={`label ${$$props.class ?? ''}`} class:required>
	<slot />
	{#if required}
		<slot name="requiredIndicator">
			<span class="label-required-indicator">•</span>
		</slot>
	{/if}
</label>
