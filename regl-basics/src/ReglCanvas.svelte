<script>
	import createREGL from 'regl';

	export let width;
	export let height;
	export let regl;
	export let attributes = {
		depth: false,
		antialias: true,
	};
	export let extensions = ['OES_standard_derivatives'];

	let canvas;
	let devicePixelRatio = 1;

	$: if (width && height && canvas) {
		devicePixelRatio = window.devicePixelRatio || 1;

		canvas.width = devicePixelRatio * width;
		canvas.height = devicePixelRatio * height;

		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		regl = createREGL({
			canvas,
			pixelRatio: devicePixelRatio,
			attributes,
			extensions,
		});
	}
</script>

<canvas bind:this={canvas} />

<style>
</style>
