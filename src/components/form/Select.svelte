<script lang="ts">
	import Icon from '~/components/base/misc/Icon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import type { ModifierPhases } from '@popperjs/core';
	import { createListBox } from '~/core/listbox.ts';
	import Button from '~/components/base/button/Button.svelte';
	import type { ListItem } from 'core/infra/type.ts';

	// TODO: Add support for multiple selection
	export let items: ListItem[] = [];
	export let value: string | null = null;
	export let id: string;
	export let name: string;
	export let placeholder = 'Select an option';

	export let placement:
		| 'bottom-end'
		| 'bottom-start'
		| 'top-end'
		| 'top-start'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end' = 'bottom-start';

	export let strategy: 'fixed' | 'absolute' = 'absolute';
	export let offsetX = 8;
	export let offsetY = 8;
	let popperOptions = {
		placement,
		strategy,
		modifiers: [
			{ name: 'offset', options: { offset: [offsetX, offsetY] } },
			{
				name: 'sameWidth',
				enabled: true,
				phase: 'beforeWrite' as ModifierPhases,
				requires: ['computeStyles'],
				// @ts-ignore
				fn: ({ state }) => {
					state.styles.popper.width = `${state.rects.reference.width}px`;
				},
				// @ts-ignore
				effect: ({ state }) => {
					state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
				}
			}
		]
	};
	const [popperRef, popperContent] = createPopperActions(popperOptions);
	const listbox = createListBox({
		items: items,
		selected: items.find((item) => item.value === value)?.id
	});

	// sync props with hook state
	$: {
		if (value) {
			listbox.set({ selected: items.find((item) => item.value === value)?.id });
		}
	}
</script>

<select {name} {id} class="hidden" />
<span>{$listbox.items.length}</span>
<div class="relative group">
	<slot name="trigger" expanded={$listbox.expanded} actions={[listbox.trigger, popperRef]}>
		<Button actions={[listbox.trigger, popperRef]}
			>{value ?? placeholder}
			<Icon name={$listbox.expanded ? 'chevron-up' : 'chevron-down'} /></Button
		>
	</slot>
</div>
{#if $listbox.expanded}
	<ul
		use:listbox.items
		use:popperContent={popperOptions}
		class="inline-block overflow-auto rounded-sm shadow-xl outline-none bg-dark-5 backdrop-blur-sm dark:bg-light-5 max-h-96"
	>
		{#each items as item (item.id)}
			{@const selected = $listbox.selected === item.id}
			{@const active = $listbox.active === item.id}
			<slot name="item" option={item} {selected} {active}>
				<li
					use:listbox.item={item}
					value={item}
					disabled={item.disabled}
					class={!$$slots.item
						? `${active ? 'bg-dark-2 dark:bg-light-2 dark:text-dark text-light' : ''} ${
								selected
									? 'backlight-corner-r backlight-rainbow after:animate-glow after:scale-75 after:-translate-y-1'
									: ''
						  } relative outline-none px-4 py-2 backlight ${
								item.disabled ? 'opacity-50 pointer-events-none' : ''
						  }`
						: ''}
				>
					<span class={selected ? 'backlight backlight-full backlight-success' : ''}
						>{item.value}</span
					>
				</li>
			</slot>
		{/each}
	</ul>
{/if}
