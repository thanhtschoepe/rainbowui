<script lang="ts">
	import { createPopperActions } from 'svelte-popperjs';
	import { createPopover } from '~/core/popover.ts';

	export let placement:
		| 'bottom-end'
		| 'bottom-start'
		| 'top-end'
		| 'top-start'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end' = 'bottom-start';
	export let strategy = 'fixed' as const;
	export let offsetX = 4;
	export let offsetY = 4;

	const [popperRef, popperContent] = createPopperActions();
	let popperOptions = {
		placement,
		strategy,
		modifiers: [{ name: 'offset', options: { offset: [offsetX, offsetY] } }]
	};
	let purpose: 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid' | 'dialog' = 'menu';
	const popover = createPopover({ purpose });
</script>

<div>
	<slot name="trigger" actions={[popperRef, popover.triggerElement]} />
	{#if $popover.expanded}
		<div
			use:popperContent={popperOptions}
			use:popover.panelElement
			class="p-4 border rounded-sm shadow-2xl backdrop-blur-sm bg-dark-5 dark:bg-light-5"
		>
			<slot name="content" />
		</div>
	{/if}
</div>
