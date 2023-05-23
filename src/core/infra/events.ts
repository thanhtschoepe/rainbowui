import { applyEventListeners } from './behaviors.js';
import type { Behavior, Key } from './type.ts';

type InternalKeyHandler = (event: KeyboardEvent) => void;

export const invokeOnKey =
	(...keys: Key[]) =>
	(fn: InternalKeyHandler) =>
	(event: KeyboardEvent) => {
		if (
			keys.includes(event.key as Key) ||
			(keys.includes('CharacterKey') && /^[a-zA-Z0-9 ]$/.test(event.key))
		)
			fn(event);
	};

export const modifyHandler =
	(modifier: Array<'preventDefault' | 'stopPropagation'>) =>
	(fn: InternalKeyHandler): InternalKeyHandler =>
	(event) => {
		modifier.forEach((mod) => event[mod]());
		fn(event);
	};

export const onKey =
	(...keys: Key[]) =>
	(fn: InternalKeyHandler) => {
		const handler = modifyHandler(['preventDefault', 'stopPropagation'])(fn);
		return invokeOnKey(...keys)(handler);
	};

export function onClickOutside(fn: (event: Event) => void, when?: () => boolean) {
	return (node: HTMLElement) => {
		function handler(event: Event) {
			if ((event as PointerEvent).pointerType === '') return; // ignore space as click
			if (!when || when()) {
				if (!node.contains(event.target as Node)) {
					if (node.clientWidth) {
						event.preventDefault();
						event.stopPropagation();
						fn(event);
					}
				}
			}
		}

		document.documentElement.addEventListener('click', handler, true);
		return () => {
			document.documentElement.removeEventListener('click', handler, true);
		};
	};
}
