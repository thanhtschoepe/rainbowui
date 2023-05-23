// misc functions that does not really belong anywhere else

/**
 * Extracts the textual value from an HTMLElement for search purposes.
 * @param {HTMLElement | null | undefined} node - The element to extract the text from.
 * @param {Set<HTMLElement>} visitedNodes - Set of visited nodes to prevent infinite recursion.
 * @returns {string} The extracted text value.
 */
export function extractTextualValue(
	node: HTMLElement | null | undefined,
	visitedNodes = new Set<HTMLElement>()
): string {
	if (!node || visitedNodes.has(node)) return '';
	visitedNodes.add(node);

	const ariaLabelledBy = node.getAttribute('aria-labelledby');
	let referencedNodeText = '';
	if (ariaLabelledBy) {
		const ids = ariaLabelledBy.split(' ');
		for (const id of ids) {
			const referencedNode = document.getElementById(id);
			referencedNodeText += extractTextualValue(referencedNode, visitedNodes);
		}
	}

	return node.textContent?.trim() ?? node.getAttribute('aria-label') ?? referencedNodeText;
}

export function log(fn: any, msg?: string) {
	return function () {
		console.log(msg);
		console.log(fn.name, arguments);
		return fn(arguments);
	};
}
