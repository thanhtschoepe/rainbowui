<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import Input from './Input.svelte';
	import Label from './Label.svelte';
	import Icon from '../base/misc/Icon.svelte';
</script>

<Meta title="form/Select" component={Select} />

<Template let:args>
	<Select {...args} />
</Template>

<Story
	name="Default"
	args={{
		options: [
			{ id: 1, content: 'Durward Reynolds', disabled: false },
			{ id: 2, content: 'Kenton Towne', disabled: false },
			{ id: 3, content: 'Therese Wunsch', disabled: false },
			{ id: 4, content: 'Benedict Kessler', disabled: true },
			{ id: 5, content: 'Katelyn Rohan', disabled: false }
		]
	}}
/>
<Story
	name="using option slot"
	args={{
		options: [
			{ id: 1, content: 'Durward Reynolds', disabled: false },
			{ id: 2, content: 'Kenton Towne', disabled: false },
			{ id: 3, content: 'Therese Wunsch', disabled: false },
			{ id: 4, content: 'Benedict Kessler', disabled: true },
			{ id: 5, content: 'Katelyn Rohan', disabled: false }
		]
	}}
>
	<Select
		options={[
			{ id: 1, content: 'Durward Reynolds', disabled: false },
			{ id: 2, content: 'Kenton Towne', disabled: false },
			{ id: 3, content: 'Therese Wunsch', disabled: false },
			{ id: 4, content: 'Benedict Kessler', disabled: true },
			{ id: 5, content: 'Katelyn Rohan', disabled: false }
		]}
		value={{ id: 1, content: 'Durward Reynolds', disabled: false }}
	>
		<div
			slot="option"
			let:option
			let:selected
			class="grid grid-cols-6 gap-1 px-2 py-2 mx-4 my-2 rounded-full"
		>
			<span class="col-span-1">
				{#if option.disabled}
					<Icon name="x-mark" class="stroke-2 stroke-dark-1 animate-draw" />
				{:else if selected}
					<Icon name="check" class="stroke-2 stroke-dark-1 animate-draw" />
				{:else}
					{''}
				{/if}
			</span>
			<span class="col-span-5">{option.content}</span>
		</div>
	</Select>
</Story>
<Story name="using value slot">
	<Select
		placeholder={'Select food'}
		options={[
			{ id: 1, content: '🍕 Pizza', disabled: false },
			{ id: 2, content: '🍔 Burger', disabled: false },
			{ id: 3, content: '🍣 Sushi', disabled: false },
			{ id: 4, content: '🍜 Ramen', disabled: false },
			{ id: 5, content: '🍦 Ice Cream', disabled: false }
		]}
	>
		<div slot="value" let:value let:open let:placeholder class="inline-block">
			{value?.content ?? placeholder}
			{#if value?.content.includes('Pizza')}
				<Icon name="face-smile" class="inline stroke-2 stroke-dark-1" />
			{:else}
				<Icon name="box" class="inline stroke-2 stroke-dark-1" />
			{/if}
		</div>
	</Select>
</Story>
<Story
	name="using option slot: hack for customized component"
	args={{
		options: [
			{ id: 1, content: 'Durward Reynolds', disabled: false },
			{ id: 2, content: 'Kenton Towne', disabled: false },
			{ id: 3, content: 'Therese Wunsch', disabled: false },
			{ id: 4, content: 'Benedict Kessler', disabled: true },
			{ id: 5, content: 'Katelyn Rohan', disabled: false }
		]
	}}
>
	<Select
		options={[
			{
				id: '#input',
				content: '',
				disabled: true
			},
			{ id: 1, content: 'Durward Reynolds', disabled: false },
			{ id: 2, content: 'Kenton Towne', disabled: false },
			{ id: 3, content: 'Therese Wunsch', disabled: false },
			{ id: 4, content: 'Benedict Kessler', disabled: true },
			{ id: 5, content: 'Katelyn Rohan', disabled: false }
		]}
		value={{ id: 1, content: 'Durward Reynolds', disabled: false }}
	>
		<div slot="option" let:option let:selected class="px-2 py-2 mx-4 my-2 rounded-full">
			{#if option.id === '#input'}
				<span class="inline-block mt-3">
					<Input type="text" id={option.id} autofocus={false}>
						<Label slot="label">Add another option</Label>
					</Input>
				</span>
			{:else}
				<span>{option.content}</span>
			{/if}
		</div>
	</Select>
</Story>
