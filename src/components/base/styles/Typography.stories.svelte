<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import TypographyDemo from './TypographyDemo.svelte';
</script>

<Meta title="styles/Typography" component={TypographyDemo} />
<Template let:args>
	<TypographyDemo />
</Template>
<Story name="default" />
