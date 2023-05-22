import type { AriaAttributes } from 'react';
import { derived, writable } from 'svelte/store';
import { ensureId, getPrefix } from './infra/id.ts';
import { applyBehaviors } from './infra/applyBehaviors.ts';
import {
	setAriaAttributes,
	setAttributes,
	syncAriaAttribute,
	applyEventListeners,
	focusOnClose,
	setAriaRole,
	focusOnExpanded
} from './infra/behaviors.ts';
import { onClickOutside, onKey } from './infra/events.ts';
import { Focus, focusIn } from './infra/focus.ts';

export interface Popover {
	'aria-expanded': AriaAttributes['aria-expanded'];
	'aria-controls'?: AriaAttributes['aria-controls'];
	'aria-label'?: AriaAttributes['aria-label'];
	triggerElId?: string;
	panelElId?: string;
	purpose: 'modal' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'alertdialog';
}

export function createPopover(init: Partial<Popover>) {
	const prefix = getPrefix('popover');

	let state: Popover = { purpose: 'menu', ...init, 'aria-expanded': false };

	const store = writable(state);

	const set = (part: Partial<Popover>) => store.set((state = { ...state, ...part }));

	const open = () => set({ 'aria-expanded': true });
	const close = () => set({ 'aria-expanded': false });
	const toggle = () => (state['aria-expanded'] === true ? close() : open());

	// trigger
	function triggerElement(node: HTMLElement) {
		ensureId(node, prefix);
		set({ triggerElId: node.id });

		const destroy = applyBehaviors(node, [
			setAttributes<HTMLButtonElement>({
				type: 'button',
				tabIndex: 0
			}),
			setAriaRole('button'),
			setAriaAttributes({
				'aria-haspopup': true
			}),
			syncAriaAttribute(store, 'aria-expanded'),
			syncAriaAttribute(store, 'aria-controls'),
			syncAriaAttribute(store, 'aria-label'),
			applyEventListeners('click', [toggle]),
			applyEventListeners('keydown', [onKey('Enter', ' ')(toggle), onKey('Escape')(close)]),
			focusOnClose(store)
		]);

		return {
			destroy
		};
	}
	// panel
	function panelElement(node: HTMLElement) {
		ensureId(node, prefix);
		set({ panelElId: node.id });

		const destroy = applyBehaviors(node, [
			setAriaRole(state.purpose),
			focusOnExpanded(store),
			onClickOutside(close),
			applyEventListeners('keydown', [
				onKey('Escape')(close),
				onKey('Tab')((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | (evt.shiftKey ? Focus.Previous : Focus.Next));
				}),
				onKey(
					'ArrowDown',
					'ArrowRight'
				)((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | Focus.Next);
				}),
				onKey(
					'ArrowUp',
					'ArrowLeft'
				)((evt) => {
					evt.preventDefault();
					focusIn(node, Focus.WrapAround | Focus.Previous);
				})
			])
		]);

		return {
			destroy
		};
	}

	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($state) => {
		const { 'aria-expanded': expanded } = $state;
		return { expanded };
	});

	return {
		subscribe,
		triggerElement,
		panelElement,
		open,
		close,
		set
	};
}
