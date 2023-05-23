<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SelectDemo from './SelectDemo.svelte';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/SelectDemo" component={SelectDemo} />

<Template let:args>
	<SelectDemo {...args} />
</Template>

<Story name="Default" />
