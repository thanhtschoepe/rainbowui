import type { Behavior } from './type.ts';

export const applyBehaviors = (node: HTMLElement, behaviors: Behavior[]) => {
	const unsubscribes = behaviors.map((behavior) => behavior(node));
	return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
};
