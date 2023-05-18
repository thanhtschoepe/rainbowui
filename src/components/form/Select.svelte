<script lang="ts" context="module">
	export type SelectOption = {
		id: number | string | Symbol;
		content: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import Icon from '../base/misc/Icon.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import type { ModifierPhases } from '@popperjs/core';

	export let options: SelectOption[] = [];
	export let value: (typeof options)[0] | null = null;
	export let multiple = false;
	export let creatable = false;
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
</script>

<Listbox {value} on:change={(e) => (value = e.detail)} class="relative group" let:open>
	<div use:popperRef>
		<ListboxButton
			class={`button variant-default status-initial ${
				open ? 'backlight-corner-br backlight after:blur-sm' : ''
			}`}
		>
			<slot name="value" {value} {open} {placeholder}>
				{value?.content ?? placeholder}
				<Icon name={open ? 'chevron-down' : 'chevron-up-down'} />
			</slot>
		</ListboxButton>
	</div>
	<div use:popperContent={popperOptions} class="inline-flex">
		<ListboxOptions
			unmount={false}
			class="inline-block overflow-auto rounded-sm shadow-xl outline-none bg-dark-5 backdrop-blur-sm dark:bg-light-5 max-h-96"
		>
			{#each options as item (item.id)}
				<ListboxOption
					value={item}
					disabled={item.disabled}
					let:active
					let:selected
					class={({ active, selected }) =>
						!$$slots.option
							? `${active ? 'bg-dark-2 dark:bg-light-2 dark:text-dark text-light' : ''} ${
									selected
										? 'backlight-corner-r backlight-rainbow after:animate-glow after:scale-75 after:-translate-y-1'
										: ''
							  } px-4 py-2 backlight ${item.disabled ? 'opacity-50 pointer-events-none' : ''}`
							: ''}
				>
					<slot name="option" option={item} {selected} {active}>
						<span class={selected ? 'backlight backlight-full backlight-success' : ''}
							>{item.content}</span
						>
					</slot>
				</ListboxOption>
			{/each}
		</ListboxOptions>
	</div>
</Listbox>
