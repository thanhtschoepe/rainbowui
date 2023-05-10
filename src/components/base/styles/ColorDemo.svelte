<script>
	let imgUrl =
		'https://images.unsplash.com/photo-1618172842918-3eabce30c912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80';
	let imgUrl2 =
		'https://images.unsplash.com/photo-1614088439978-9be39d87d81a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80';
</script>

<h2 class="typo-h2 mb-8">Color</h2>
<section class="flex gap-4 flex-wrap">
	<div class="w-[18rem]">
		<div class="bg-dark-5 p-8 rounded-3xl">
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
		<p class="typo text-neutral-800/80 mt-2">
			Other structure like buttons will employ a mixture of colored-transparency instead of being
			purely colored
		</p>
		<button class="rounded-sm bg-neutral-800/20 hover:bg-neutral-800/50 py-2 px-4 typo-medium mt-4"
			>Button</button
		>
	</div>
	<div
		class="relative p-8 w-[30rem] h-10rem] block rounded-3xl overflow-hidden border-neutral-100 border"
	>
		<picture class="absolute inset-0 blur-md -z-10">
			<source srcset={imgUrl2} type="image/jpg" />
			<img src={imgUrl2} alt="Nasa img2" />
		</picture>
		<h3 class="typo-h3 text-neutral-800">Exibit 2: Lighter background</h3>
		<p class="typo text-neutral-800/50 mt-4">
			The degree of transparency will need to be adjusted, depending on the color scale
		</p>
		<button
			class="rounded-sm text-red-500 bg-red-300/20 hover:bg-red-500/50 py-2 px-4 typo-medium mt-4"
			>Delete</button
		>
	</div>
</section>
<section class="py-8">
	<h3 class="typo-h3 mb-4">Color scale</h3>
	<div class="flex flex-col gap-2 p-4 max-w-2xl">
		<div class="flex gap-2">
			<div class="rounded-sm w-20 h-20 bg-dark" />
			<div class="rounded-sm w-20 h-20 bg-dark-1" />
			<div class="rounded-sm w-20 h-20 bg-dark-2" />
			<div class="rounded-sm w-20 h-20 bg-dark-3" />
			<div class="rounded-sm w-20 h-20 bg-dark-4" />
			<div class="rounded-sm w-20 h-20 bg-dark-5" />
		</div>
		<div class="flex gap-2 bg-neutral-800 p-2 rounded">
			<div class="rounded-sm w-20 h-20 bg-light" />
			<div class="rounded-sm w-20 h-20 bg-light-1" />
			<div class="rounded-sm w-20 h-20 bg-light-2" />
			<div class="rounded-sm w-20 h-20 bg-light-3" />
			<div class="rounded-sm w-20 h-20 bg-light-4" />
			<div class="rounded-sm w-20 h-20 bg-light-5" />
		</div>
	</div>
</section>
<section class="py-8">
	<h3 class="typo-h3 mb-4">Gradients</h3>
	<div class="flex gap-4">
		<div class="rounded-sm w-40 h-20 bg-gradient-danger" />
		<div class="rounded-sm w-40 h-20 bg-gradient-success" />
		<div class="rounded-sm w-40 h-20 bg-gradient-warning" />
	</div>
</section>
