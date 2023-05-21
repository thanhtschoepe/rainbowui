import type { AriaAttributes, AriaRole, EventHandler } from 'svelte/elements';
import type { Readable } from 'svelte/store';

export const setAttributes =
	<T extends HTMLElement>(attributes: Partial<T>) =>
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
export const setAriaAttributes = (attributes: Partial<AriaAttributes>) => (node: HTMLElement) => {
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
export const setAriaRole = (role: AriaRole) => (node: HTMLElement) => {
	node.setAttribute('role', role);

	// No cleanup necessary as attributes will be removed with the node
	return () => {};
};

/**
 * Applies event listeners for a specific event type to an HTMLElement and returns a cleanup function
 * @type {Behavior}
 */
export const applyEventListeners =
	<E extends Event, T extends HTMLElement>(type: Event['type'], listeners: EventHandler<E, T>[]) =>
	(node: T) => {
		//@ts-ignore - I don't know how to fix this
		listeners.forEach((listener) => node.addEventListener(type, listener));

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
	(store: Readable<Partial<AriaAttributes>>) => (node: HTMLElement) =>
		store.subscribe((attrs) => setAriaAttributes(attrs)(node));
