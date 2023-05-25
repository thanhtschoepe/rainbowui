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
import { fireCustomEvent, onClickOutside, onKey } from './infra/events.ts';
import { Focus, focusIn } from './infra/focus.ts';
import { extractTextualValue } from './infra/misc.ts';

function fireSelectEventOnChange(selected: ListBox['selected'], state: ListBox) {
	const selectedValues = Array.from(selected.values())
		.map((id) => state.items.get(id))
		.map((item) => item?.value);

	const node = document.getElementById(state?.triggerElementId ?? '');

	if (node) {
		fireCustomEvent('select', state.multiple ? selectedValues : selectedValues[0])(node);
	}
}

export interface ListBox {
	'aria-expanded': boolean;
	'aria-activedescendant'?: string;
	triggerElementId?: string;
	containerId?: string;
	selected: Set<ListItem['id']>;
	active?: ListItem['id'];
	'aria-controls'?: string;
	items: Map<ListItem['id'], ListItem>;
	closeOnSelect?: boolean;
	multiple?: boolean;
}
export function createListBox(init: Partial<ListBox>) {
	const prefix = getPrefix('listbox');

	let state: ListBox = {
		'aria-expanded': false,
		items: new Map(),
		closeOnSelect: true,
		selected: new Set(),
		...init
	};
	const store = writable(state);

	const set = (part: Partial<ListBox>) => store.set((state = { ...state, ...part }));
	const open = () =>
		set({
			'aria-expanded': true
		});
	const close = () => set({ 'aria-expanded': false });
	const toggle = () => (state['aria-expanded'] ? close() : open());

	const select = (id: ListItem['id']) => {
		// toggle selection on item click

		if (state.multiple) {
			state.selected.add(id);
			if (state.selected.has(id)) state.selected.delete(id);
		} else {
			state.selected.clear();
			state.selected.add(id);
		}
		set({ selected: new Set(state.selected) });
		fireSelectEventOnChange(state.selected, state);
		if (state.closeOnSelect) close();
	};
	const search = (q: string) => {
		const re = new RegExp(`^${q}`, 'i');
		const matched = Array.from(state.items.values()).find(
			(item) => re.test(item.value) && !item.disabled
		);

		if (matched) {
			set({ active: matched.id });
		}
	};

	function triggerElement(node: HTMLElement) {
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
	function listElement(node: HTMLElement) {
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

	function listItemElement(node: HTMLElement, item: ListItem) {
		ensureId(node, prefix);

		const update = (options?: ItemOption) => {
			console.log('Update was invoked');
			const textValue = options?.value ?? extractTextualValue(node);
			const disabled = options?.disabled ?? node.hasAttribute('disabled');

			const values = {
				value: textValue,
				disabled
			};

			const foundItem = state.items.get(item.id);
			if (foundItem) {
				if (foundItem.value === values.value && foundItem.disabled === values.disabled) return;
				Object.assign(foundItem, values);
			} else {
				state.items.set(item.id, { id: item.id, ...values });
			}
			set({ items: state.items });
		};
		const syncListItemAria =
			(store: Readable<ListBox>): Behavior =>
			(node) =>
				derived(store, ($store) => {
					const found = $store.items.get(item.id);
					return {
						selected: $store.selected.has(item.id) || null,
						disabled: found?.disabled
					};
				}).subscribe(({ disabled, selected }) =>
					setAriaAttributes({ 'aria-disabled': disabled, 'aria-selected': selected })(node)
				);

		const syncActiveFocus =
			(store: Readable<ListBox>): Behavior =>
			(node) =>
				derived(store, ($store) => $store.active).subscribe((active) => {
					if (
						active === item.id &&
						(node.contains(document.activeElement) || document.activeElement === node)
					)
						node.focus();
				});

		const destroy = applyBehaviors(node, [
			// prevent options from gaining keyboard focus
			setAttributes({
				tabIndex: item.disabled ? -1 : 0
			}),
			setAriaRole('option'),
			syncListItemAria(store),
			syncActiveFocus(store),
			// Event handlers
			// Select the enabled item on click
			applyEventListeners('click', [() => select(item.id)]),
			applyEventListeners('pointerenter', [
				() => {
					node.focus();
				}
			]),
			applyEventListeners('keydown', [onKey('Enter', ' ')(() => select(item.id))]),
			applyEventListeners('focus', [
				() => set({ active: item.id, 'aria-activedescendant': node.id })
			])
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
		triggerElement,
		listElement,
		listItemElement,
		open,
		close,
		set,
		select
	};
}
