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
	| 'Tab'
	| 'Home'
	| 'End'
	| 'CharacterKey';

export interface ListItem {
	id: string;
	value: any;
	disabled: boolean;
}

export interface ItemOption {
	value?: any;
	disabled?: boolean;
}
