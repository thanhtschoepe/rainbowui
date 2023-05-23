<script lang="ts">
	import Icon from '~/components/base/misc/Icon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import type { ModifierPhases } from '@popperjs/core';
	import { createListBox } from '~/core/listbox.ts';
	import { makeId } from '~/core/infra/id.ts';
	import Button from '~/components/base/button/Button.svelte';
	import type { ListItem } from '~/core/infra/type.ts';

	export let items: ListItem[] = [];
	export let value: string | null = null;
	export let id: string = makeId('component-select');
	export let name: string;
	export let placeholder = 'Select an option';
	export let multiple = false;
	export let closeOnSelect = true;

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
		modifiers: [{ name: 'offset', options: { offset: [offsetX, offsetY] } }]
	};

	let itemsMap = new Map(items.map((item) => [item.id, item]));
	const [popperRef, popperContent] = createPopperActions(popperOptions);
	const listbox = createListBox({
		items: itemsMap
	});

	$: {
		listbox.select(Array.from(itemsMap.values()).find((item) => item.value === value)?.id);
	}
	$: {
		listbox.set({
			multiple,
			closeOnSelect
		});
	}
</script>

<select {name} {id} class="hidden" />
<div class="relative group">
	<slot name="trigger" expanded={$listbox.expanded} actions={[listbox.triggerElement, popperRef]}>
		<Button actions={[listbox.triggerElement, popperRef]}
			>{value ?? placeholder}
			<Icon name={$listbox.expanded ? 'chevron-up' : 'chevron-down'} /></Button
		>
	</slot>
</div>
{#if $listbox.expanded}
	<ul
		use:listbox.listElement
		use:popperContent={popperOptions}
		class="inline-block overflow-auto rounded-sm shadow-xl outline-none bg-dark-5 backdrop-blur-sm dark:bg-light-5 max-h-96"
	>
		{#each items as item (item.id)}
			{@const active = $listbox.active === item.id}
			{@const selected = $listbox.selected.has(item.id)}
			<slot name="item" option={item} {selected} {active}>
				<li
					use:listbox.listItemElement={item}
					value={item}
					disabled={item.disabled}
					class={!$$slots.item
						? `${
								active ? 'bg-dark-2 dark:bg-light-2 dark:text-dark text-light' : ''
						  } group relative outline-none px-4 py-2 backlight aria-selected:backlight-corner-r aria-selected:backlight-rainbow aria-selected:after:animate-glow aria-selected:after:scale-75 aria-selected:after:-translate-y-1
								${item.disabled ? 'opacity-50 pointer-events-none' : ''}`
						: ''}
				>
					<span
						class={'group-aria-selected:backlight group-aria-selected:backlight-full group-aria-selected:backlight-success '}
						>{item.value}</span
					>
				</li>
			</slot>
		{/each}
	</ul>
{/if}
