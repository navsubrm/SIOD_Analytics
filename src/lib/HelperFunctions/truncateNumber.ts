export function truncateToDecimalPlaces(num: number, decimalPlaces: number = 1) {
	const factor = Math.pow(10, decimalPlaces);
	return Math.trunc(num * factor) / factor;
}
