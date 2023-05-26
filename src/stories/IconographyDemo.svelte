<script lang="ts">
	import Icon, { icons } from '~/components/base/misc/Icon.svelte';
	import type { IconName } from '~/components/base/misc/Icon.svelte';
	import Button from '~/components/base/button/Button.svelte';
	import Input from '~/components/form/Input.svelte';

	let copiedStatus: Record<IconName, 'INITIAL' | 'SUCCESS'> = {};
	const copy = (iconName: IconName) => {
		navigator.clipboard.writeText(iconName);
		copiedStatus[iconName] = 'SUCCESS';
	};
	let imgUrl =
		'https://images.unsplash.com/photo-1610571273412-f43a878c1550?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80';

	let searchIconName = '';
	let matchingIcons: IconName[] = icons;
	$: {
		matchingIcons = icons.filter((i) => new RegExp(searchIconName).test(i));
	}
</script>

<h2 class="mb-8 typo-h2">Iconography</h2>
<Input class="mb-8" bind:value={searchIconName} autofocus>
	<Icon name="magnifying-glass" slot="suffix" class="inline-block" />
</Input>
<div
	class="relative grid grid-cols-4 gap-4 p-8 overflow-hidden border rounded-md border-dark-md lg:grid-cols-6"
>
	<picture class="absolute inset-0 blur-md -z-10">
		<source srcset={imgUrl} type="image/jpg" />
		<img src={imgUrl} alt="Nasa img" class="w-full" />
	</picture>
	{#each matchingIcons as icon (icon)}
		<div>
			<Button
				networkStatus={copiedStatus[icon] ?? 'INITIAL'}
				variant="icon"
				on:pointerup={() => copy(icon)}
				on:keyup={(evt) => (evt.code === 'Space' ? copy(icon) : null)}
				class={'group flex w-full flex-col items-center mx-auto' +
					(copiedStatus[icon] === 'SUCCESS' ? 'text-success' : '')}
				let:networkStatus
			>
				<div
					class="bg-transparent backlight backlight-full group-hover:backlight-rainbow group-hover:after:animate-glow"
				>
					<Icon
						name={networkStatus === 'SUCCESS' ? 'check' : icon}
						class="w-6 h-6 bg-transparent group-hover:animate-pulse"
					/>
				</div>

				<p class="typo-caption text-dark-1 group-hover:text-dark">{icon}</p>
			</Button>
		</div>
	{/each}
</div>
