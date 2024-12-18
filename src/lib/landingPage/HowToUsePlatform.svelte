<script>
	const points = [
		'Explore and find the course which suites your taste. Register with the learning center near you.',
		'Re-skill and up-skill under the guidance of expert mentors.',
		'Complete the course with flying colors',
		'Be a star employee or start your own business. The opportunities are ENDLESS!!'
	];
</script>

<div
	class="min-h-screen bg-white px-4 sm:pb-8 md:px-16 md:pb-16 py-12 lg:px-12 h-auto 2xl:max-w-7xl w-full mx-auto"
>
	<div class=" mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left Column -->
			<div class="space-y-8">
				<h1 class="uppercase-headers">INVEST IN YOURSELF AND REAP THE REWARDS</h1>

				<p class="text-darkGray text-base">
					Upskill, Reskill and Transform your careers with Government of India approved courses
				</p>

				<div class="space-y-6">
					{#each points as point}
						<div class="flex items-start gap-4 bg-blue-10 p-4 rounded-lg">
							<div class="mt-1 flex-shrink-0">
								<img
									src="/bullet_point.svg"
									alt="Graduates celebrating success"
									class="w-12 h-12"
								/>
							</div>
							<p class="text-darkGray">{point}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right Column -->
			<div class="relative">
				<!-- Decorative background elements -->

				<img
					src="/graduated_students.svg?height=500&width=500"
					alt="Graduates celebrating success"
					class="relative z-10 w-full h-auto"
				/>
			</div>
		</div>
	</div>
</div>
