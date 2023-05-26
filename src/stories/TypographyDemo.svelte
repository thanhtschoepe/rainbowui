<script>
	let sample = 'The fox jumps over the lazy dog';
</script>

<main class="text-dark">
	<h1 class="my-8 typo-h2">Typography</h1>
	<section class="flex flex-wrap justify-start gap-4 m-0">
		<div class="w-72 shrink-0">
			<div class="p-8 rounded-md bg-dark-5">
				<h4 class="my-2 text-lg font-semibold">Sizing</h4>
				<ul>
					<li class="flex items-baseline justify-between">
						<p class="text-sm">Sm</p>
						<p class="typo-caption">text-sm</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="text-md">Md</p>
						<p class="typo-caption">text-md</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="text-lg">Lg</p>
						<p class="typo-caption">text-lg</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="text-xl">XL</p>
						<p class="typo-caption">text-xl</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="text-2xl">2XL</p>
						<p class="typo-caption">text-2xl</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="text-3xl">3XL</p>
						<p class="typo-caption">text-3xl</p>
					</li>
				</ul>
			</div>
		</div>

		<div class="max-w-xl px-8">
			<h4 class="my-2 text-lg font-semibold">Sample</h4>
			<div class="flex flex-wrap gap-3">
				<p class="p-4 text-sm rounded-md bg-dark-5">{sample}</p>
				<p class="p-4 rounded-md text-base/tight bg-dark-5">{sample}</p>
				<p class="p-4 rounded-md text-lg/tight bg-dark-5">{sample}</p>
				<p class="p-4 rounded-md text-xl/tight bg-dark-5">{sample}</p>
				<p class="p-4 rounded-md text-2xl/tight bg-dark-5">{sample}</p>
				<p class="p-4 rounded-md text-3xl/tight bg-dark-5">{sample}</p>
			</div>
		</div>
		<div>
			<h4 class="my-2 text-lg font-semibold">Content preset</h4>
			<div class="p-8 rounded-md bg-dark text-light">
				<ul>
					<li class="flex items-baseline justify-between">
						<p class="typo-caption">typo-caption</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="typo">typo</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="typo-subheading">typo-subtitle</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="typo-h3">XL</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="typo-h2">2XL</p>
					</li>
					<li class="flex items-baseline justify-between">
						<p class="typo-h1">Typo-H1</p>
					</li>
				</ul>
			</div>
		</div>
	</section>
</main>
