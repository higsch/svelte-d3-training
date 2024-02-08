<script>
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let path;
	export let opacity = 1.0;
	export let stroke = undefined;
	export let strokeWidth = 1;
	export let fill = undefined;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);
	const tOpacity = tweened(opacity, { duration: 200, delay: 0 });

	function draw(ctx) {
		const p = new Path2D(path);
		ctx.globalAlpha = $tOpacity;
		ctx.fillStyle = fill;
		ctx.fill(p);
		if (stroke) {
			ctx.strokeStyle = stroke;
			ctx.lineWidth = strokeWidth;
			ctx.stroke(p);
		} 
	}

	onMount(() => {
		register(draw);
		invalidate();
	});

	onDestroy(() => {
		deregister(draw);
	});

	afterUpdate(invalidate);

	$: tOpacity.set(opacity, { duration: 200, delay: opacity === 1.0 ? 0 : 800});
</script>
