<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../base/button/Button.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="components/Popover" component={Popover} />

<Template let:args>
	<Popover {...args}>
		<Button slot="trigger" let:actions {actions}>Open me</Button>
		<div slot="content">
			<div class="flex gap-2">
				{#each ['archive-box-arrow-down', 'anchor', 'arrow-left', 'arrow-trending-up', 'arrow-up-tray'] as icon}
					<Button variant="icon">
						<Icon name={icon} />
					</Button>
				{/each}
			</div>
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
