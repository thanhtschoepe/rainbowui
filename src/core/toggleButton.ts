import { derived, writable } from 'svelte/store';
import { applyBehaviors } from './applyBehaviors.ts';
import type { AriaAttributes } from 'react';
import {
	setAttributes,
	syncAriaAttributes,
	applyEventListeners,
	setAriaRole
} from './behaviors.ts';
import { onKey } from './events.ts';

interface ButtonAria {
	'aria-pressed': AriaAttributes['aria-pressed'];
	'aria-label': AriaAttributes['aria-label'];
}

export function createButton(
	init: Partial<ButtonAria> = {
		'aria-pressed': false
	}
) {
	// prefix for generating unique IDs
	const prefix = 'button';

	let state: typeof init = {
		...init
	};

	// wrap with store for reactivity
	const store = writable(state);

	// update state and notify store of changes for reactivity
	const set = (part: Partial<ButtonAria>) => store.set((state = { ...state, ...part }));

	const press = () => set({ 'aria-pressed': true });
	const release = () => {
		return set({ 'aria-pressed': false });
	};
	const toggle = () => (state['aria-pressed'] === true ? release() : press());

	// button
	function button(node: HTMLElement) {
		node.id = node.id || prefix + Math.random().toString(36).substring(2, 15);

		const destroy = applyBehaviors(node, [
			setAriaRole('button'),
			setAttributes<HTMLButtonElement>({
				type: 'button',
				tabIndex: 0
			}),
			syncAriaAttributes(store),
			applyEventListeners('click', [toggle]),
			applyEventListeners('keydown', [onKey('Enter', ' ')(toggle)])
		]);

		return {
			destroy
		};
	}

	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($state) => $state['aria-pressed']);

	return {
		subscribe,
		button,
		set
	};
}
