import { createPopperActions } from 'svelte-popperjs';

export type Placement =
	| 'bottom-end'
	| 'bottom-start'
	| 'top-end'
	| 'top-start'
	| 'left-start'
	| 'left-end'
	| 'right-start'
	| 'right-end';

type Popper = {
	placement: Placement;
	strategy: 'fixed' | 'absolute';
	offsetX: number;
	offsetY: number;
};
export function createPopper(init: Partial<Popper>) {
	function makePopperContentOptions(config: Partial<Popper> = {}) {
		const { placement = 'bottom-start', strategy = 'fixed', offsetX = 8, offsetY = 8 } = config;
		return {
			placement,
			strategy,
			modifiers: [{ name: 'offset', options: { offset: [offsetX, offsetY] } }]
		};
	}

	const [popperRef, popperContent] = createPopperActions(makePopperContentOptions(init));

	return {
		popperRef,
		popperContent,
		makePopperContentOptions
	};
}
