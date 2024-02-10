const goldenRatio = (1 + Math.sqrt(5)) / 2;
const irrational2 = 1 + Math.sqrt(2);
const irrational3 = (9 + Math.sqrt(221)) / 10;

export const layoutPhyllotaxis = (
	data,
	{
		radius = 1,
		radiusOffset = radius / 2,
		spacing = radius * 1.5,
		theta = (2 * Math.PI) / goldenRatio,
	} = {}
) => {
	const layoutedData = data.map((d, i) => {
		const localTheta = theta * i;
		const localRadius = Math.sqrt(i) * spacing + radiusOffset;

		return {
			...d,
			r: radius,
			x: Math.cos(localTheta) * localRadius,
			y: Math.sin(localTheta) * localRadius,
		};
	});

	return layoutedData;
};
