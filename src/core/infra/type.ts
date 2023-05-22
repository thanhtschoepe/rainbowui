export type UnsubscribeFn = () => void;
export type Behavior = (node: HTMLElement) => UnsubscribeFn;

export type Key =
	| 'Enter'
	| ' '
	| 'Escape'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'Tab';
