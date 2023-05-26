<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/Select" component={Select} />

<Template let:args>
	<Select {...args} />
</Template>

<Story
	name="Default"
	args={{
		value: 'Katelyn Rohan',
		items: [
			{ id: 1, value: 'Durward Reynolds', disabled: false },
			{ id: 2, value: 'Kenton Towne', disabled: false },
			{ id: 3, value: 'Therese Wunsch', disabled: false },
			{ id: 4, value: 'Benedict Kessler', disabled: true },
			{ id: 5, value: 'Katelyn Rohan', disabled: false }
		]
	}}
/>
