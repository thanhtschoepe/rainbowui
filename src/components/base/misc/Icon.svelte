<script context="module" lang="ts">
	export const icons = [
		'activity',
		'airplay',
		'alert-circle',
		'alert-octagon',
		'alert-triangle',
		'align-center',
		'align-justify',
		'align-left',
		'align-right',
		'anchor',
		'aperture',
		'archive',
		'arrow-down-circle',
		'arrow-down-left',
		'arrow-down-right',
		'arrow-down',
		'arrow-left-circle',
		'arrow-left',
		'arrow-right-circle',
		'arrow-right',
		'arrow-up-circle',
		'arrow-up-left',
		'arrow-up-right',
		'arrow-up',
		'at-sign',
		'award',
		'bar-chart-2',
		'bar-chart',
		'battery-charging',
		'battery',
		'bell-off',
		'bell',
		'bluetooth',
		'bold',
		'book-open',
		'book',
		'bookmark',
		'box',
		'briefcase',
		'calendar',
		'camera-off',
		'camera',
		'cast',
		'check-circle',
		'check-square'
	];
	export type IconName = (typeof icons)[number];
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let name: string;

	onMount(() => {
		window?.feather?.replace();
	});
</script>

<i
	data-feather={name}
	class={$$props.class ?? ' ' + 'inline stroke-dark dark:stroke-light h-5 w-5'}
/>
