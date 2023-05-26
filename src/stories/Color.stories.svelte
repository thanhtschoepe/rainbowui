<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ColorDemo from './ColorDemo.svelte';
</script>

<Meta title="styles/Color" component={ColorDemo} />
<Template let:args>
	<ColorDemo />
</Template>
<Story name="default" />
