<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/Checkbox" component={Checkbox} />
<Template let:args>
	<Checkbox {...args} />
</Template>

<Story name="unchecked" args={{ label: 'I agree to sell all my data' }}>
	<Checkbox id="1">
		<label slot="label" for={'1'}>I agree to sell all my data</label>
	</Checkbox>
</Story>
<Story name="checked" args={{ checked: true }}>
	<Checkbox id="2" checked>
		<label slot="label" for={'2'}>I agree to sell all my data</label>
	</Checkbox>
</Story>
<Story name="disabled" args={{ checked: true, disabled: true, id: 3 }}>
	<Checkbox id="3" checked disabled>
		<label slot="label" for={'3'}>I agree to sell all my data</label>
	</Checkbox>
</Story>
