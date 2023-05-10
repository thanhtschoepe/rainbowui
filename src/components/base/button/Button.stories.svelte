<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
</script>

<Meta title="component/Button" component={Button} />
<Template let:args>
	<Button {...args} />
</Template>
<Story name="default" args={{ children: 'hello' }} />
<Story name="with icon" args={{ children: 'hello' }} />
