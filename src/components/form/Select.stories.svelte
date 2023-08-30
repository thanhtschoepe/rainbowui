<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	let list = [
		{ id: 1, value: 'Banana', disabled: false },
		{ id: 2, value: 'Strawberry', disabled: false },
		{ id: 3, value: 'Peach', disabled: false },
		{ id: 4, value: 'Kiwi', disabled: true },
		{ id: 5, value: 'Durian', disabled: false }
	];
</script>

<Meta title="form/Select" component={Select} />

<Template let:args>
	<Select {...args} />
</Template>

<Story
	name="Default"
	args={{
		value: 'Katelyn Rohan',
		items: list
	}}
/>
<Story
	name="multiple"
	args={{
		value: ['Strawberry', 'Peach'],
		items: list
	}}
/>
<Story
	name="multiple"
	args={{
		value: ['Strawberry', 'Peach'],
		items: list
	}}
/>
