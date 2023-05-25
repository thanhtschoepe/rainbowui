<script lang="ts">
	import Icon from '~/components/base/misc/Icon.svelte';
	import { createListBox } from '~/core/listbox.ts';
	import { makeId } from '~/core/infra/id.ts';
	import Button from '~/components/base/button/Button.svelte';
	import type { ListItem } from '~/core/infra/type.ts';
	import type { Popper } from '~/core/type.ts';
	import { createPopper } from '~/core/popper.ts';

	export let items: ListItem[] = [];
	export let value: string | null | string[] = null;
	export let id: string = makeId('component-select');
	export let name: string;
	export let placeholder = 'Select an option';
	export let closeOnSelect = true;
	export let popperOptions: Popper;

	$: multiple = Array.isArray(value);
	$: itemsMap = new Map(items.map((item) => [item.id, item]));

	const popper = createPopper();
	const listbox = createListBox({
		items: new Map(items.map((item) => [item.id, item]))
	});

	$: {
		listbox.set({
			multiple,
			closeOnSelect,
			items: itemsMap
		});
	}
	$: {
		// Update selected in hook based on value
		const selected = items.find((item) => item.value === value)?.id;
		if (selected) {
			listbox.select(selected);
		}
	}

	function onSelect(e: Event) {
		const selected = (e as CustomEvent).detail;
		value = selected;
	}
</script>

<select {name} {id} class="hidden" />
<div class="relative group">
	<slot
		name="trigger"
		expanded={$listbox.expanded}
		actions={[listbox.triggerElement, popper.popperRef]}
	>
		{#if multiple}
			<div class="p-4" use:listbox.triggerElement use:popper.popperRef>
				{#if !value || !value.length}
					{placeholder}
				{/if}
				{#each value as v, i}
					<span class="px-2 py-1 bg-yellow-200 typo-caption">{v}</span>
				{/each}
			</div>
		{:else}
			<Button actions={[listbox.triggerElement, popper.popperRef]} on:select={onSelect}
				>{value ?? placeholder}
				<Icon name={$listbox.expanded ? 'chevron-up' : 'chevron-down'} /></Button
			>
		{/if}
	</slot>
</div>
{#if $listbox.expanded}
	<ul
		use:listbox.listElement
		use:popper.popperContent={popper.makePopperContentOptions(popperOptions)}
		class="inline-block overflow-auto rounded-sm shadow-xl outline-none bg-dark-5 backdrop-blur-sm dark:bg-light-5 max-h-96"
	>
		{#each items as item (item.id)}
			{@const active = $listbox.active === item.id}
			{@const selected = $listbox.selected.has(item.id)}
			<slot
				name="item"
				option={item}
				{selected}
				{active}
				actions={[[listbox.listItemElement, item]]}
			>
				<li
					use:listbox.listItemElement={item}
					value={item}
					disabled={item.disabled}
					class={`${
						active ? 'bg-dark-2 dark:bg-light-2 dark:text-dark text-light' : ''
					} group relative outline-none px-4 py-2 backlight aria-selected:backlight-corner-r aria-selected:backlight-rainbow aria-selected:after:animate-glow aria-selected:after:scale-75 aria-selected:after:-translate-y-1
								${item.disabled ? 'opacity-50 pointer-events-none' : ''}`}
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
