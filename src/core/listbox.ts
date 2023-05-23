import type { AriaAttributes } from 'svelte/elements';
import { ensureId, getPrefix } from './infra/id.ts';
import type { Behavior, ItemOption, ListItem } from './infra/type.ts';
import { derived, writable, type Readable } from 'svelte/store';
import { applyBehaviors } from './infra/applyBehaviors.ts';
import {
	applyEventListeners,
	focusOnClose,
	focusOnExpanded,
	setAriaAttributes,
	setAriaRole,
	setAttributes,
	syncAriaAttribute
} from './infra/behaviors.ts';
import { onClickOutside, onKey } from './infra/events.ts';
import { Focus, focusIn } from './infra/focus.ts';
import { extractTextualValue } from './infra/misc.ts';

export interface ListBox {
	'aria-expanded': boolean;
	'aria-activedescendant'?: string;
	triggerElementId?: string;
	containerId?: string;
	selected?: ListItem['id'];
	active?: ListItem['id'];
	'aria-controls'?: string;
	items: ListItem[];
	closeOnSelect?: boolean;
}
export function createListBox(init: Partial<ListBox>) {
	const prefix = getPrefix('listbox');

	let state: ListBox = {
		'aria-expanded': false,
		items: [] as ListItem[],
		closeOnSelect: true,
		...init
	};

	const store = writable(state);

	const set = (part: Partial<ListBox>) => store.set((state = { ...state, ...part }));

	const open = () =>
		set({
			'aria-expanded': true,
			active: state.items.find((x) => x.id === state.selected)?.id
		});
	const close = () => set({ 'aria-expanded': false });
	const toggle = () => (state['aria-expanded'] ? close() : open());
	// TODO: implement select and search
	const select = (item: ListItem) => {
		set({ selected: item.id });
		if (state.closeOnSelect) close();
	};
	const search = (q: string) => console.log('Searching', q);

	function trigger(node: HTMLElement) {
		ensureId(node, prefix);
		set({ triggerElementId: node.id });

		const destroy = applyBehaviors(node, [
			// TODO: evaluate if type and role needs to be set
			setAttributes({
				tabIndex: 0
			}),
			setAriaRole('button'),
			setAriaAttributes({
				'aria-haspopup': 'listbox'
			}),
			syncAriaAttribute(store, 'aria-expanded'),
			syncAriaAttribute(store, 'aria-controls'),
			applyEventListeners('click', [toggle]),
			applyEventListeners('keydown', [onKey('Enter', ' ', 'ArrowDown', 'ArrowUp')(toggle)]),
			focusOnClose(store)
		]);

		return { destroy };
	}
	// query state for searching by character key
	let query = '';
	function items(node: HTMLElement) {
		ensureId(node, prefix);
		set({ 'aria-controls': node.id });

		const destroy = applyBehaviors(node, [
			setAriaRole('option'),
			setAttributes({
				tabIndex: 0
			}),
			syncAriaAttribute(store, 'aria-activedescendant'),
			// Event handlers
			// Close on click outside
			onClickOutside(close),
			// Select the enabled item on click
			applyEventListeners('keydown', [
				onKey('ArrowUp')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | Focus.Previous);
				}),
				onKey('ArrowDown')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | Focus.Next);
				}),
				onKey('Home')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.First);
				}),
				onKey('Tab')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | (evt.shiftKey ? Focus.Previous : Focus.Next));
				}),
				onKey('End')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.Last);
				}),
				// close the listbox on Escape key
				onKey('Escape')(close),
				// search by character key, reset query after 350ms of inactivity
				onKey('CharacterKey')((evt) => {
					const key = evt.key.toLowerCase();
					let timeout: number = 0;

					if (timeout) {
						clearTimeout(timeout);
					}

					query += key;
					search(query);
					// debouncing reset of search query
					timeout = window.setTimeout(() => {
						timeout = 0;
						query = '';
					}, 350);
				})
			]),
			// focus-related bahaviors
			// focus on the first item when the listbox is expanded
			focusOnExpanded(store)
		]);

		return {
			destroy
		};
	}

	function item(node: HTMLElement, item: ListItem) {
		ensureId(node, prefix);

		const update = (options?: ItemOption) => {
			const textValue = options?.value ?? extractTextualValue(node);
			const disabled = options?.disabled ?? node.hasAttribute('disabled');

			const values = {
				value: textValue,
				disabled
			};

			// TODO: refactor into Map for faster look up
			const foundItem = state.items.find((item) => item.id === node.id);

			if (foundItem) {
				if (foundItem.value === values.value && foundItem.disabled === values.disabled) return;
				Object.assign(foundItem, values);
			} else {
				state.items.push({ id: node.id, ...values });
			}
			set({ items: state.items });
		};
		const syncListItemAria =
			(store: Readable<{ items: ListItem[]; selected?: ListItem['id'] }>): Behavior =>
			(node) =>
				derived(store, ($store) => {
					// TODO: efficient search
					const found = $store.items.find((x) => x.id === item.id);
					return {
						// TODO: implement multi-select
						selected: found?.id === $store?.selected || null,
						disabled: found?.disabled
					};
				}).subscribe(({ disabled, selected }) =>
					setAriaAttributes({ 'aria-disabled': disabled, 'aria-selected': selected })(node)
				);

		const destroy = applyBehaviors(node, [
			// prevent options from gaining keyboard focus
			setAttributes({
				tabIndex: item.disabled ? -1 : 0
			}),
			setAriaRole('option'),
			syncListItemAria(store),
			// Event handlers
			// Select the enabled item on click
			applyEventListeners('click', [() => select(item)]),
			applyEventListeners('pointerenter', [
				() => {
					node.focus();
				}
			]),
			applyEventListeners('keydown', [onKey('Enter', ' ')(() => select(item))]),
			applyEventListeners('focus', [() => set({ active: item.id })])
		]);

		return {
			update,
			destroy
		};
	}
	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($store) => ({
		expanded: $store['aria-expanded'],
		selected: $store.selected,
		active: $store.active,
		items: $store.items
	}));

	return {
		subscribe,
		trigger,
		items,
		item,
		open,
		close,
		set
	};
}
