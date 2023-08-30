<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../base/button/Button.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="components/Popover" component={Popover} />

<Template let:args>
	<div class="m-64">
		<Popover {...args}>
			<Button slot="trigger" let:actions {actions}>Open me</Button>
			<div slot="content">
				<div class="flex gap-2">
					{#each ['archive-box-arrow-down', 'arrow-up', 'arrow-left', 'arrow-trending-up', 'arrow-up-tray'] as icon}
						<Button variant="icon">
							<Icon name={icon} />
						</Button>
					{/each}
				</div>
			</div>
		</Popover>
	</div>
</Template>

<Story name="position/auto" args={{ popperOptions: { placement: 'auto' } }} />
<Story name="position/auto-start" args={{ popperOptions: { placement: 'auto-start' } }} />
<Story name="position/auto-end" args={{ popperOptions: { placement: 'auto-end' } }} />
<Story name="position/top" args={{ popperOptions: { placement: 'top' } }} />
<Story name="position/top-start" args={{ popperOptions: { placement: 'top-start' } }} />
<Story name="position/top-end" args={{ popperOptions: { placement: 'top-end' } }} />
<Story name="position/bottom" args={{ popperOptions: { placement: 'bottom' } }} />
<Story name="position/bottom-start" args={{ popperOptions: { placement: 'bottom-start' } }} />
<Story name="position/bottom-end" args={{ popperOptions: { placement: 'bottom-end' } }} />
<Story name="position/right" args={{ popperOptions: { placement: 'right' } }} />
<Story name="position/right-start" args={{ popperOptions: { placement: 'right-start' } }} />
<Story name="position/right-end" args={{ popperOptions: { placement: 'right-end' } }} />
<Story name="position/left" args={{ popperOptions: { placement: 'left' } }} />
<Story name="position/left-start" args={{ popperOptions: { placement: 'left-start' } }} />
<Story name="position/left-end" args={{ popperOptions: { placement: 'left-end' } }} />
