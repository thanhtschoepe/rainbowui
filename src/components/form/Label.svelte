<script>
	export let required = false;
</script>

<label
	for={$$props.for}
	class={`relative backlight typo-caption ${$$props.class ?? ''} ${
		required
			? 'backlight after:duration-750 group-focus-within:backlight-danger after:transition-all backlight-corner-br'
			: ''
	}`}
>
	<slot />
	{#if required}
		<slot name="requiredIndicator">
			<span class="inline-block text-red-600 transition-all group-hover:animate-bounce">•</span>
		</slot>
	{/if}
</label>
