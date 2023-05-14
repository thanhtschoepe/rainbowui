<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
</script>

<Meta title="components/Popover" component={Popover} />

<Template let:args>
	<Popover {...args}>
		<span slot="button">Click me</span>
		<div slot="content">
			<p>Popover content goes here</p>
		</div>
	</Popover>
</Template>

<Story name="position/auto" args={{ placement: 'auto' }} />
<Story name="position/auto-start" args={{ placement: 'auto-start' }} />
<Story name="position/auto-end" args={{ placement: 'auto-end' }} />
<Story name="position/top" args={{ placement: 'top' }} />
<Story name="position/top-start" args={{ placement: 'top-start' }} />
<Story name="position/top-end" args={{ placement: 'top-end' }} />
<Story name="position/bottom" args={{ placement: 'bottom' }} />
<Story name="position/bottom-start" args={{ placement: 'bottom-start' }} />
<Story name="position/bottom-end" args={{ placement: 'bottom-end' }} />
<Story name="position/right" args={{ placement: 'right' }} />
<Story name="position/right-start" args={{ placement: 'right-start' }} />
<Story name="position/right-end" args={{ placement: 'right-end' }} />
<Story name="position/left" args={{ placement: 'left' }} />
<Story name="position/left-start" args={{ placement: 'left-start' }} />
<Story name="position/left-end" args={{ placement: 'left-end' }} />
