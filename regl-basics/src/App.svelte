<script>
	import { coordinates, radii, colors, opacities } from './dots';

	import ReglCanvas from './ReglCanvas.svelte';

	let width, height;
	let regl;

	$: if (regl) {
		const drawDots = regl({
			frag: `
        #ifdef GL_OES_standard_derivatives
          #extension GL_OES_standard_derivatives: enable
        #endif

        precision mediump float;
        varying vec3 fragColor;
        varying float fragOpacity;

        void main() {
          vec2 cxy = gl_PointCoord * 2.0 - 1.0;
          float r = dot(cxy, cxy);
          float alpha = 1.0;
          #ifdef GL_OES_standard_derivatives
            float delta = fwidth(r);
            alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
          #endif

          gl_FragColor = vec4(fragColor, 1.0) * alpha * fragOpacity;
        }
    `,
			vert: `
        precision mediump float;

        attribute vec2 coord;
        attribute float opacity;
        attribute float radius;
        attribute vec3 color;
        
        varying vec3 fragColor;
        varying float fragOpacity;
        
        void main() {
            gl_PointSize = radius;
            fragColor = color;
            fragOpacity = opacity;
            gl_Position = vec4(coord, 0.0, 1.0);
        }
    `,
			attributes: {
				coord: (_, props) => props.coordinates,
				opacity: (_, props) => props.opacities,
				radius: (_, props) => props.radii,
				color: (_, props) => props.colors,
			},
			blend: {
				enable: true,
				func: {
					srcRGB: 'src alpha',
					srcAlpha: 'src alpha',
					dstRGB: 'one minus src alpha',
					dstAlpha: 'one minus src alpha',
				},
			},
			count: (_, props) => props.coordinates.length,
			primitive: 'points',
		});
		drawDots({ coordinates, colors, opacities, radii });
	}
</script>

<main
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<ReglCanvas
		width={width}
		height={height}
		bind:regl={regl}
	/>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
