<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import Icon from '../misc/Icon.svelte';
</script>

<Meta title="component/Button" component={Button} />
<Template let:args>
	<Button {...args} />
</Template>
<Story name="default">
	<Button>Click me</Button>
</Story>
<Story name="with icon">
	<Button variant="icon">
		<Icon name="plus" />
	</Button>
</Story>
<Story name="with icon as prefix">
	<Button variant="default">
		<Icon name="plus" />
		<span>Add new</span>
	</Button>
</Story>
