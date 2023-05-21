<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import Icon from '../misc/Icon.svelte';
</script>

<Meta title="components/Button" component={Button} />
<Template let:args>
	<Button {...args} />
</Template>
<Story name="default">
	<Button on:click={() => alert('Clicked')}>Click me</Button>
</Story>
<Story name="with icon">
	<Button variant="icon" label="add">
		<Icon name="plus" />
	</Button>
</Story>
<Story name="with icon as prefix">
	<Button variant="default">
		<Icon name="plus" />
		<span>Add new</span>
	</Button>
</Story>
<Story name="networkStatus=PENDING">
	<Button networkStatus="PENDING" let:networkStatus>
		<Icon name="chevron-double-up" class="animate-bounce" />
		<span>Submitting</span>
	</Button>
</Story>
<Story name="networkStatus=SUCCESS">
	<Button networkStatus="SUCCESS" let:networkStatus>
		<Icon name="check" />
		<span>Done</span>
	</Button>
</Story>
<Story name="networkStatus=ERROR">
	<Button networkStatus="ERROR" let:networkStatus>
		<div class="flex gap-2 animate-shake">
			<Icon name="x-circle" />
			<span>Error</span>
		</div>
	</Button>
</Story>
