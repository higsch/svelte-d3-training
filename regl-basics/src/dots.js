import { scaleSequential, interpolateWarm, rgb, randomExponential } from 'd3';

const numDots = 100000;

// dot coordinates
const getWebGLCoordinate = () => Math.random() * 2 - 1;
const coordinates = Array.from({ length: numDots }).map(() => {
	return [getWebGLCoordinate(), getWebGLCoordinate()];
});

// dot radii
const randomExponentialGenerator = randomExponential(0.5);
const radii = Array.from({ length: numDots }).map(
	() => randomExponentialGenerator() * (window.devicePixelRatio || 1.0)
);

// dot colors
const colorGenerator = scaleSequential([0, numDots - 1], interpolateWarm);
const colors = Array.from({ length: numDots }).map((_, i) => {
	const { r, g, b } = rgb(colorGenerator(i));
	return [r / 255, g / 255, b / 255];
});

// dot opacities
const opacities = Array.from({ length: numDots }).map(() => Math.random());

export { coordinates, radii, colors, opacities };
