let id = 0;

export const newID = () => id++;

export const getPrefix = (name: string) => `svelte-accessible-${name}`;
export const ensureId = (node: HTMLElement, prefix: string) =>
	node.id || (node.id = `${prefix}-${newID()}`);
