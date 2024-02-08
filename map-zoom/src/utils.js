// From: https://bocoup.com/weblog/2d-picking-in-canvas
let nextCol = 1;
export const genColor = () => {
	const ret = [];
	// via http://stackoverflow.com/a/15804183
	if (nextCol < 16777215) {
		ret.push(nextCol & 0xff); // R
		ret.push((nextCol & 0xff00) >> 8); // G
		ret.push((nextCol & 0xff0000) >> 16); // B
		nextCol += 1;
	}
	return 'rgb(' + ret.join(',') + ')';
};
