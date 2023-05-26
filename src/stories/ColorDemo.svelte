<script lang="ts">
	import Button from '~/components/base/button/Button.svelte';
	let imgUrl =
		'https://images.unsplash.com/photo-1618172842918-3eabce30c912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80';
	let imgUrl2 =
		'https://images.unsplash.com/photo-1614088439978-9be39d87d81a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80';
</script>

<h2 class="mb-8 typo-h2">Color</h2>
<section class="flex flex-wrap gap-4">
	<div class="w-[18rem]">
		<div class="p-8 bg-dark-5 rounded-3xl">
			<p class="typo">
				We use a design system that employs glassmorphisim and neumorphism. Because of this, we
				won't be using significant color rather than neutral tone. Most of the color comes from the
				background gradient
			</p>
		</div>
	</div>
	<div class="relative p-8 w-[30rem] h-10rem] block rounded-3xl overflow-hidden">
		<picture class="absolute inset-0 blur-md -z-10">
			<source srcset={imgUrl} type="image/jpg" />
			<img src={imgUrl} alt="Nasa img" />
		</picture>
		<h3 class="typo-h3 text-neutral-800">Exibit 1</h3>
		<p class="typo text-neutral-800/50">For example the use of this card</p>
		<p class="mt-2 typo text-neutral-800/80">
			Other structure like buttons will employ a mixture of colored-transparency instead of being
			purely colored
		</p>
		<Button class="mt-4">Button</Button>
	</div>
	<div
		class="relative p-8 w-[30rem] h-10rem] block rounded-3xl overflow-hidden border-neutral-100 border"
	>
		<picture class="absolute inset-0 blur-md -z-10">
			<source srcset={imgUrl2} type="image/jpg" />
			<img src={imgUrl2} alt="Nasa img2" />
		</picture>
		<h3 class="typo-h3 text-neutral-800">Exibit 2: Lighter background</h3>
		<p class="mt-4 typo text-neutral-800/50">
			The degree of transparency will need to be adjusted, depending on the color scale
		</p>
		<Button class="mt-4 text-red-500 !bg-red-500/25">Terminate</Button>
	</div>
</section>
<section class="py-8">
	<h3 class="mb-4 typo-h3">Color scale</h3>
	<div class="flex flex-col max-w-2xl gap-2 p-4">
		<div class="flex gap-2">
			<div class="w-20 h-20 rounded-sm bg-dark" />
			<div class="w-20 h-20 rounded-sm bg-dark-1" />
			<div class="w-20 h-20 rounded-sm bg-dark-2" />
			<div class="w-20 h-20 rounded-sm bg-dark-3" />
			<div class="w-20 h-20 rounded-sm bg-dark-4" />
			<div class="w-20 h-20 rounded-sm bg-dark-5" />
		</div>
		<div class="flex gap-2 p-2 rounded bg-neutral-800">
			<div class="w-20 h-20 rounded-sm bg-light" />
			<div class="w-20 h-20 rounded-sm bg-light-1" />
			<div class="w-20 h-20 rounded-sm bg-light-2" />
			<div class="w-20 h-20 rounded-sm bg-light-3" />
			<div class="w-20 h-20 rounded-sm bg-light-4" />
			<div class="w-20 h-20 rounded-sm bg-light-5" />
		</div>
	</div>
</section>
<section class="py-8">
	<h3 class="mb-4 typo-h3">Gradients</h3>
	<div class="flex gap-4">
		<div class="w-40 h-20 rounded-sm bg-gradient-danger" />
		<div class="w-40 h-20 rounded-sm bg-gradient-success" />
		<div class="w-40 h-20 rounded-sm bg-gradient-warning" />
	</div>
</section>
