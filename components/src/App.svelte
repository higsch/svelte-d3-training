<script>
	import { scaleLinear } from 'd3';

	import Circle from './Circle.svelte';

  let data = [];
	setInterval(() => {
		data = Array.from({ length: 1000 }).map(() => {
			return {
				a: Math.random(),
				b: Math.random(),
				r: Math.random(),
				fill: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
					Math.random() * 255
				})`,
			};
		});
	}, 2000);

	let width = 1000;
	let height = 500;

	$: xScale = scaleLinear().domain([0, 1]).range([0, width]);

	$: yScale = scaleLinear().domain([0, 1]).range([height, 0]);

	$: rScale = scaleLinear()
		.domain([0, 1])
		.range([5, width / 100]);
</script>

<main
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
	>
		{#each data as { a, b, r, fill }}
			<Circle
				x={xScale(a)}
				y={yScale(b)}
				r={rScale(r)}
				fill={fill}
			/>
		{/each}
	</svg>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
	}

	svg {
		background: #f3fff0;
	}
</style>
