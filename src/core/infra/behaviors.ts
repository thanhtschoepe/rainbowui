import type { AriaAttributes, AriaRole, Booleanish, EventHandler } from 'svelte/elements';
import { derived, type Readable } from 'svelte/store';
import type { Behavior } from './type.ts';
import { Focus, focusIn } from './focus.ts';

export const setAttributes =
	<T extends HTMLElement>(attributes: Partial<T>): Behavior =>
	(node: HTMLElement) => {
		/** @type {[string,(string|boolean|null|number)]} */
		Object.entries(attributes).forEach(([key, value]) => {
			if (value == null) {
				node.removeAttribute(key);
			} else {
				node.setAttribute(key, value.toString());
			}
		});

		// No cleanup necessary as attributes will be removed with the node
		return () => {};
	};

/**
 * Sets Aria attributes for an HTMLElement
 * @type {Behavior}
 */
export const setAriaAttributes =
	(attributes: Partial<AriaAttributes>): Behavior =>
	(node: HTMLElement) => {
		/** @type {[string,(string|boolean|null|number)]} */
		Object.entries(attributes).forEach(([key, value]) => {
			if (value == null) {
				node.removeAttribute(key);
			} else {
				node.setAttribute(key, value.toString());
			}
		});

		// No cleanup necessary as attributes will be removed with the node
		return () => {};
	};

/**
 * Sets Aria role for an HTMLElement
 * @type {Behavior}
 */
export const setAriaRole =
	(role: AriaRole): Behavior =>
	(node: HTMLElement) => {
		node.setAttribute('role', role);

		// No cleanup necessary as attributes will be removed with the node
		return () => {};
	};

/**
 * Applies event listeners for a specific event type to an HTMLElement and returns a cleanup function
 * @type {Behavior}
 */
export const applyEventListeners =
	<E extends Event, T extends HTMLElement>(
		type: Event['type'],
		listeners: EventHandler<E, T>[],
		useCapture?: boolean
	) =>
	(node: T) => {
		//@ts-ignore - I don't know how to fix this
		listeners.forEach((listener) => node.addEventListener(type, listener, null, useCapture));

		// Cleanup function to remove event listeners when node is destroyed
		//@ts-ignore - I don't know how to fix this
		return () => listeners.forEach((listener) => node.removeEventListener(type, listener));
	};

/**
 * Syncs Aria attributes from a Svelte store to an HTMLElement
 * @param {Readable<Partial<AriaAttributes>>} store
 * @returns {Function} - A function that takes an HTMLElement and applies the behavior
 */
export const syncAriaAttributes =
	(store: Readable<Partial<AriaAttributes>>): Behavior =>
	(node: HTMLElement) =>
		store.subscribe((attrs) => setAriaAttributes(attrs)(node));

export const syncAriaAttribute =
	(store: Readable<Partial<AriaAttributes>>, attribute: keyof AriaAttributes): Behavior =>
	(node: HTMLElement) =>
		derived(store, ($store) => $store[attribute]).subscribe((value) =>
			setAriaAttributes({ [attribute]: value })(node)
		);

export const setFocus =
	(node: HTMLElement, self: boolean = false) =>
	(focus: AriaAttributes['aria-expanded']) => {
		const coercedToBoolean = typeof focus === 'string' ? focus === 'true' : focus;
		if (coercedToBoolean) {
			// may need to wait for svelte to update UI before we can set focus
			requestAnimationFrame(() => focusIn(self ? [node] : node, Focus.FirstSelected));
		}
	};

export const focusOnExpanded =
	(store: Readable<{ 'aria-expanded': AriaAttributes['aria-expanded'] }>): Behavior =>
	(node) =>
		derived(store, ($store) => $store['aria-expanded']).subscribe(setFocus(node));

export const focusOnClose =
	(store: Readable<{ 'aria-expanded': AriaAttributes['aria-expanded'] }>): Behavior =>
	(node) =>
		derived(store, ($store) => !$store['aria-expanded']).subscribe(setFocus(node, true));
