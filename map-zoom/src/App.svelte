<script>
	import { json, geoAlbersUsa, geoPath, zoomIdentity } from 'd3';

	import { genColor } from './utils';

	import Canvas from './Canvas.svelte';
	import County from './County.svelte';

	let width, height;
	let hoveredColorId;
	let clickedCounty;
	let transform = zoomIdentity;

	const geojsonPath =
		'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json';
	let geojson;
	json(geojsonPath).then((data) => (geojson = data));

	$: projection = geoAlbersUsa().fitSize([width, height], geojson);
	$: pathGenerator = geoPath(projection);

	let counties = [];
	$: if (geojson)
		counties = geojson.features.map((feature) => {
			return {
				...feature,
				path: pathGenerator(feature),
				colorId: genColor(),
				bounds: pathGenerator.bounds(feature),
			};
		});

	$: if (clickedCounty) {
		const [[x0, y0], [x1, y1]] = clickedCounty.bounds;
		transform = zoomIdentity
			.translate(width / 2, height / 2)
			.scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
			.translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
	} else {
		transform = zoomIdentity;
	}

	$: hoveredCounty = counties.find((c) => c.colorId === hoveredColorId);
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (clickedCounty = undefined)}/>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:click={() => (clickedCounty = hoveredCounty)}
>
	<Canvas
		width={width}
		height={height}
		transform={transform}
		bind:hoveredColorId={hoveredColorId}
	>
		{#each counties as { id, path }}
			<County
				path={path}
				fill="purple"
				opacity={hoveredCounty && hoveredCounty.id === id ? 1.0 : 0.5}
			/>
		{/each}
	</Canvas>
	<Canvas
		width={width}
		height={height}
		transform={transform}
		bind:hoveredColorId={hoveredColorId}
		hide
		--position="absolute"
	>
		{#each counties as { id, path, colorId }}
			<County
				path={path}
				fill={colorId}
				stroke="#FFFFFF"
				opacity={1.0}
			/>
		{/each}
	</Canvas>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		cursor: pointer;
		overflow: hidden;
	}
</style>
