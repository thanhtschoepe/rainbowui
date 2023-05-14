<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/Input" component={Input} />
<Template let:args>
	<Input {...args} />
</Template>
<Story name="default/text" />
<Story name="default/number" args={{ type: 'number', autofocus: true }} />
<Story
	name="number/with min and max"
	args={{ type: 'number', autofocus: true, max: '10', min: 5 }}
/>
<Story
	name="default/password"
	args={{
		type: 'password',
		autofocus: true
	}}
/>
<Story
	name="with prefix"
	args={{
		type: 'password',
		autofocus: true
	}}
>
	<Input>
		<Icon name="lock-closed" slot="prefix" class="inline-block" />
	</Input>
</Story>
<Story
	name="with suffix"
	args={{
		type: 'password',
		autofocus: true
	}}
>
	<Input id="1">
		<Icon slot="suffix" name="magnifying-glass" class="inline-block" />
	</Input>
</Story>
<Story
	name="state/disabled"
	args={{
		autofocus: true,
		disabled: true,
		value: 'I am disabled'
	}}
/>
<Story
	name="state/invalid"
	args={{
		autofocus: true,
		invalid: true,
		value: 'Not valid'
	}}
/>
<Story
	name="state/valid"
	args={{
		autofocus: true,
		invalid: false,
		value: 'valid'
	}}
/>
<Story
	name="with label"
	args={{
		type: 'password',
		autofocus: true
	}}
>
	<Input id="1" class="mt-5">
		<Label slot="label" for="1" required>Labelled input</Label>
		<Icon slot="suffix" name="magnifying-glass" class="inline-block" />
	</Input>
</Story>
