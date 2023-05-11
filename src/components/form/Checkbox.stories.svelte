<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/Checkbox" component={Checkbox} />
<Template let:args>
	<Checkbox {...args} />
</Template>

<Story name="unchecked" arg={{ label: 'I agree to sell all my data' }}>
	<Checkbox>
		<span slot="label">I agree to sell all my data</span>
	</Checkbox>
</Story>
<Story name="checked" arg={{ checked: true }}>
	<Checkbox checked>
		<span slot="label">I agree to sell all my data</span>
	</Checkbox>
</Story>
<Story name="disabled" arg={{ checked: true }}>
	<Checkbox checked disabled>
		<span slot="label">I agree to sell all my data</span>
	</Checkbox>
</Story>
