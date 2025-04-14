function isWithinLast5Minutes(date: string) {
	const dateTest = new Date(date);
	const now = new Date();
	const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes in milliseconds

	return dateTest >= fiveMinutesAgo && dateTest <= now;
}

export { isWithinLast5Minutes };
