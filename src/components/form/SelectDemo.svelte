<script lang="ts">
	import Select from './Select.svelte';
	import Button from '../base/button/Button.svelte';

	let items = [
		{ id: 1, value: 'Durward Reynolds', disabled: false },
		{ id: 2, value: 'Kenton Towne', disabled: false },
		{ id: 3, value: 'Therese Wunsch', disabled: false },
		{ id: 4, value: 'Benedict Kessler', disabled: true },
		{ id: 5, value: 'Katelyn Rohan', disabled: false }
	];
	let value = 'Kenton Towne';
	let status = 'INITIAL';
	let onClick = () => {
		status = 'PENDING';
		setTimeout(() => {
			status = 'SUCCESS';
			items.push({ id: 6, value: 'New Item', disabled: false });
		}, 3000);
	};
</script>

<Button class="mb-8" networkStatus={status} on:click={onClick}>Click to add an item</Button>
<Button
	class="mb-8"
	on:click={() => {
		value = 'Therese Wunsch';
	}}>Change value</Button
>

<Select bind:value {items} />
