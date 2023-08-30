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

	const popper = createPopper();
	const listbox = createListBox({
		items: new Map(items.map((item) => [item.id, item]))
	});

	$: multiple = Array.isArray(value);
	$: {
		listbox.set({
			multiple,
			closeOnSelect,
			items: new Map(items.map((item) => [item.id, item]))
		});
	}
	// Update selected in hook based on value
	// $: {
	// 	let selected = [];
	// 	if (!Array.isArray(value)) {
	// 		selected = [items.find((item) => item.value === value)?.id];
	// 	} else {
	// 		selected = value.map((v) => itemsMap.get(v));
	// 	}
	// 	console.log('Selected = ', selected);
	// 	selected.forEach(listbox.select);
	// }

	// function onSelect(e: Event) {
	// 	const selected = (e as CustomEvent).detail;
	// 	console.log('Select event fired', selected);
	// 	value = selected;
	// }
</script>

<select {name} {id} class="hidden" />
<div class="relative group">
	<slot
		name="trigger"
		expanded={$listbox.expanded}
		actions={[listbox.triggerElement, popper.popperRef]}
	>
		{#if Array.isArray(value)}
			<Button actions={[listbox.triggerElement, popper.popperRef]}>
				<span class="select-trigger-multiple">
					{#if !value || !value.length}
						{placeholder}
					{/if}
					{#each value as v}
						<span class="tag">{v}</span>
					{/each}
				</span>
				<Icon name={$listbox.expanded ? 'chevron-up' : 'chevron-down'} />
			</Button>
		{:else}
			<Button actions={[listbox.triggerElement, popper.popperRef]}>
				{value ?? placeholder}
				<Icon name={$listbox.expanded ? 'chevron-up' : 'chevron-down'} />
			</Button>
		{/if}
	</slot>
</div>
{#if $listbox.expanded}
	<ul
		use:listbox.listElement
		use:popper.popperContent={popper.makePopperContentOptions(popperOptions)}
		class="select-option-container"
	>
		{#each items as item (item.id)}
			{@const active = $listbox.active === item.id}
			{@const selected = $listbox.selected.has(item.id)}
			<slot
				actions={[[listbox.listItemElement, item]]}
				name="item"
				option={item}
				{selected}
				{active}
			>
				<li
					use:listbox.listItemElement={item}
					value={item}
					class="select-option group"
					class:active
				>
					<span class="select-option-item">{item.value}</span>
				</li>
			</slot>
		{/each}
	</ul>
{/if}
