<script lang="ts">
	import { createPopperActions } from 'svelte-popperjs';
	import { createPopover } from '~/core/popover.ts';
	import type { Popper } from '~/core/popper.ts';
	import { createPopper } from '~/core/popper.ts';

	export let popperOptions: Popper | undefined;
	export let purpose: 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid' | 'dialog' = 'menu';

	const popper = createPopper(popperOptions);
	const popover = createPopover({ purpose });
</script>

<div>
	<slot name="trigger" actions={[popper.popperRef, popover.triggerElement]} />
	{#if $popover.expanded}
		<div
			use:popper.popperContent={popper.makePopperContentOptions(popperOptions)}
			use:popover.panelElement
			class="p-4 border rounded-sm shadow-2xl backdrop-blur-sm bg-dark-5 dark:bg-light-5"
		>
			<slot name="content" />
		</div>
	{/if}
</div>
