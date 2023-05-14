<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Label from './Label.svelte';
</script>

<Meta title="form/Label" component={Label} />
<Template let:args>
	<Label {...args} />
</Template>

<Story name="default" args={{ forId: 'exampleInput' }}>
	<Label>Hello world</Label>
</Story>
<Story name="required" args={{ forId: 'exampleInput' }}>
	<Label required>Hello world</Label>
</Story>
