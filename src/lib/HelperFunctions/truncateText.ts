export function truncateText(string: string, length: number) {
	if (string.length < length) return string;
	const trunc = string.substring(0, length);
	if (length == 0) return '';
	return `${trunc}...`;
}
