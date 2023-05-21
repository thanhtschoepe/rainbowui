<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Dialog from './Dialog.svelte';
	import Button from '../base/button/Button.svelte';
	import Input from '../form/Input.svelte';
	import Checkbox from '../form/Checkbox.svelte';

	let open = true;
</script>

<Meta title="components/Dialog" component={Dialog} />

<Story name="default">
	<div>
		<Dialog {open}>
			<p>Dialog content goes here</p>
		</Dialog>
	</div>
</Story>

<Story name="with content">
	<div>
		<Dialog {open} class="max-w-lg">
			<h2 class="mb-6 typo-h3">Hello world</h2>
			<p class="typo-body">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum,
				quod, quia voluptatem voluptas quos asperiores, voluptate quae doloribus quas. Quisquam
				quibusdam, voluptatum, quod, quia voluptatem voluptas quos asperiores
			</p>
			<div slot="footer" class="flex items-center justify-end gap-2 mt-4">
				<Button variant="icon" class="hover:!bg-red-500/30 text-red-500" label="Close modal"
					>Close</Button
				>
				<Button>Done</Button>
			</div>
		</Dialog>
	</div>
</Story>

<Story name="with form">
	<div>
		<Dialog {open} class="max-w-xl pr-16">
			<div>
				<h2 class="mb-6 typo-h3">Form</h2>
				<form action="">
					<div class="mb-4">
						<Input label="Name" placeholder="John Doe" />
					</div>
					<div class="mb-4">
						<Input label="Email" placeholder="Your email" />
					</div>
					<div>
						<Button type="submit" formmethod="dialog">Close</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</div>
		</Dialog>
	</div>
</Story>
