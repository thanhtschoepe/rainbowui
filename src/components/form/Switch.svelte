<script lang="ts">
	import { Switch } from '@rgossiaux/svelte-headlessui';
	import Icon from '../base/misc/Icon.svelte';
	import { flip } from 'svelte/animate';

	export let id: string;
	export let disabled: boolean = false;
	export let checked: boolean = false;
	export let networkStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial';

	let generatedId = `switch-${Math.random().toString(36).substr(2, 10)}`;
	$: id = id || generatedId;

	let localNetworkStatus = networkStatus;
	$: {
		localNetworkStatus = networkStatus;
	}
	function updateNetworkStatus() {
		if (localNetworkStatus === 'SUCCESS' || localNetworkStatus === 'ERROR') {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				localNetworkStatus = 'INITIAL';
			}, revertDuration);
		}
	}
</script>

<Switch
	{checked}
	onChange={(e) => (checked = e.detail)}
	class={`backlight backlight-full backlight-full-sm group hover:bg-dark-2 outline-none border-none inline-flex items-center bg-dark-3 px-1 py-1 w-14 rounded disabled:opacity-50 disabled:pointer-events-none ${
		localNetworkStatus === 'initial'
			? checked
				? 'justify-end backlight-success'
				: 'justify-start backlight-for-focus backlight-rainbow'
			: ''
	} ${
		localNetworkStatus === 'pending' && 'justify-center backlight-rainbow after:animate-glow-pulse'
	} ${localNetworkStatus === 'error' && 'backlight-danger after:animate-shutdown'}`}
	{disabled}
	{id}
>
	<div
		class={`block w-5 h-5 transition-all ease-out transform bg-white rounded-full group-hover:scale-110 ${
			localNetworkStatus === 'pending' ? 'animate-flash' : ''
		} ${localNetworkStatus === 'error' ? 'animate-shake' : ''}`}
	/>
</Switch>
