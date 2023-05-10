<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import EffectDemo from './EffectDemo.svelte';
</script>

<Meta title="styles/Effect" component={EffectDemo} />
<Template let:args>
	<EffectDemo />
</Template>
<Story name="default" />
