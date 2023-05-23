let id = 0;

export const newID = () => id++;

export const getPrefix = (name: string) => `svelte-accessible-${name}`;
export const makeId = (prefix: string) => `${prefix}-${newID()}`;
export const ensureId = (node: HTMLElement, prefix: string) =>
	node.id || (node.id = makeId(prefix));
