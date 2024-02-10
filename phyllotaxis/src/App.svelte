<script>
  import { scaleSequential, interpolateWarm } from 'd3';
	import { layoutPhyllotaxis } from './utils';

	const data = layoutPhyllotaxis(Array.from({ length: 1000 }), { spacing: 1.7});
  const colorGenerator = scaleSequential([0, data.length - 1], interpolateWarm);

  let activeCircleIndex = 0;
  setInterval(() => activeCircleIndex++, 700);
</script>

<main>
	<svg viewBox="0 0 100 100">
		<g>
			{#each data as { x, y, r }, i}
        {@const color = colorGenerator(i)}
				<circle
					cx={x}
					cy={y}
					r={r}
          stroke={color}
          stroke-width="0.4px"
					fill={color}
          fill-opacity={i === activeCircleIndex ? 0.0 : 1.0}
				/>
			{/each}
		</g>
	</svg>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		background: radial-gradient(rgb(0, 0, 0), rgb(60, 60, 60));
	}

	svg {
		width: 100%;
		height: 100%;
	}

  g {
    transform: translate(50%, 50%);
  }
</style>
