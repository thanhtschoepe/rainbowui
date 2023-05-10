<script>
	let sample = 'The fox jumps over the lazy dog';
</script>

<main class="text-dark">
	<h1 class="text-xl font-bold my-8">Typography</h1>
	<section class="flex justify-start gap-4 flex-wrap m-0">
		<div class="w-72 shrink-0">
			<div class="bg-dark-5 p-8 rounded-md">
				<h4 class="text-lg font-semibold my-2">Sizing</h4>
				<ul>
					<li class="flex justify-between items-baseline">
						<p class="text-sm">Sm</p>
						<p>text-sm</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="text-md">Md</p>
						<p>text-md</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="text-lg">Lg</p>
						<p>text-lg</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="text-xl">XL</p>
						<p>text-xl</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="text-2xl">2XL</p>
						<p>text-2xl</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="text-3xl">3XL</p>
						<p>text-3xl</p>
					</li>
				</ul>
			</div>
		</div>

		<div class="px-8 max-w-xl">
			<h4 class="text-lg font-semibold my-2">Sample</h4>
			<div class="flex gap-3 flex-wrap">
				<p class="text-sm p-4 bg-dark-5 rounded-md">{sample}</p>
				<p class="text-base/tight p-4 bg-dark-5 rounded-md">{sample}</p>
				<p class="text-lg/tight p-4 bg-dark-5 rounded-md">{sample}</p>
				<p class="text-xl/tight p-4 bg-dark-5 rounded-md">{sample}</p>
				<p class="text-2xl/tight p-4 bg-dark-5 rounded-md">{sample}</p>
				<p class="text-3xl/tight p-4 bg-dark-5 rounded-md">{sample}</p>
			</div>
		</div>
		<div>
			<h4 class="text-lg font-semibold my-2">Content preset</h4>
			<div class="p-8 rounded-md bg-dark text-light">
				<ul>
					<li class="flex justify-between items-baseline">
						<p class="typo-caption">typo-caption</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="typo">typo</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="typo-subheading">typo-subtitle</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="typo-h3">XL</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="typo-h2">2XL</p>
					</li>
					<li class="flex justify-between items-baseline">
						<p class="typo-h1">Typo-H1</p>
					</li>
				</ul>
			</div>
		</div>
	</section>
</main>
