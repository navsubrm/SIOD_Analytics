export function truncateToDecimalPlaces(num: number, decimalPlaces: number) {
	const factor = Math.pow(10, decimalPlaces);
	return Math.trunc(num * factor) / factor;
}
