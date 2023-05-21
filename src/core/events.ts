import { applyBehaviors } from './applyBehaviors.ts';
import { applyEventListeners } from './behaviors.ts';
import type { Key } from './type.js';

type InternalKeyHandler = (event: KeyboardEvent) => void;

export const invokeOnKey =
	(...keys: Key[]) =>
	(fn: InternalKeyHandler) =>
	(event: KeyboardEvent) => {
		if (keys.includes(event.key as Key)) {
			fn(event);
		}
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
