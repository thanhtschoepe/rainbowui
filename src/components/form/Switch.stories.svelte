<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';
</script>

<Meta title="form/Switch" component={Switch} />

<Template let:args>
	<Switch {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Checked and Disabled" args={{ checked: true, disabled: true }} />
<Story name="networkStatus = PENDING" args={{ checked: false, networkStatus: 'pending' }} />
<Story name="networkStatus = ERROR" args={{ checked: false, networkStatus: 'error' }} />
