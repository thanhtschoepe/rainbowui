<script lang="ts">
	import { Popover, PopoverButton, PopoverPanel, Transition } from '@rgossiaux/svelte-headlessui';
	import { createPopperActions } from 'svelte-popperjs';
	export let placement:
		| 'bottom-end'
		| 'bottom-start'
		| 'top-end'
		| 'top-start'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end' = 'bottom-start';
	export let strategy = 'fixed';
	export let offsetX = 4;
	export let offsetY = 4;

	const [popperRef, popperContent] = createPopperActions();
	let popperOptions = {
		placement,
		strategy,
		modifiers: [{ name: 'offset', options: { offset: [offsetX, offsetY] } }]
	};
</script>

<Popover class="relative" let:open>
	<PopoverButton
		use={[popperRef]}
		class="relative z-20 inline-flex items-center gap-2 px-4 py-3 transition-all duration-150 outline-none backlight hover:shadow-lg rounded-xs typo-body2 text-dark dark:text-light disabled:opacity-50 disabled:pointer-events-none backlight-for-focus focus:backlight-corner-br focus:after:bg-gradient-rainbow bg-dark-4 dark:bg-light-3 hover:bg-dark-3 dark:hover:bg-light-2 focus:bg-dark-3"
		{...$$restProps}
	>
		<slot name="button" />
	</PopoverButton>
	<Transition
		show={open}
		enter="transition duration-150 ease-in"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition duration-150 ease-out"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		<PopoverPanel
			use={[[popperContent, popperOptions]]}
			class="p-4 border rounded-sm shadow-2xl backdrop-blur-sm bg-dark-5 dark:bg-light-5"
		>
			<slot name="content" />
		</PopoverPanel>
	</Transition>
</Popover>
