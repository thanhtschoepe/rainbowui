<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Typography from './TypographyDemo.svelte';
</script>

<Meta title="styles/Typography" component={Typography} />
<Template let:args>
	<Typography />
</Template>
<Story name="default" />
