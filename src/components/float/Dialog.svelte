<script lang="ts">
	import Button from '../base/button/Button.svelte';
	import Icon from '../base/misc/Icon.svelte';

	interface Modal {
		showModal: VoidFunction;
		close: VoidFunction;
		getBoundingClientRect: HTMLElement['getBoundingClientRect'];
	}

	export let open = true;
	let modal: Modal | undefined;

	$: if (open) {
		modal?.showModal();
	} else {
		modal?.close();
	}

	function handlePointerUp(e) {
		const modalDim = modal.getBoundingClientRect();
		if (
			e.clientX < modalDim.left ||
			e.clientX > modalDim.right ||
			e.clientY < modalDim.top ||
			e.clientY > modalDim.bottom
		) {
			modal.close();
		}
	}
</script>

<dialog
	bind:this={modal}
	on:pointerup={handlePointerUp}
	class={`outline-none relative shadow-2xl p-8 pt-10 rounded-sm bg-light dark:bg-dark backdrop:backdrop-blur-md ${$$restProps.class}`}
>
	<div class="absolute top-2 right-2">
		<Button class="!p-1" variant="icon" label="close modal" on:pointerup={() => modal?.close()}>
			<Icon name="x-mark" />
		</Button>
	</div>
	<slot />
	<slot name="footer" />
</dialog>
