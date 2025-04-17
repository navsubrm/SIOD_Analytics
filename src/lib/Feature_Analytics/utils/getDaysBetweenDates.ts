export function getDaysBetweenDates(date1: Date, date2: Date): number {
	const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
	console.log('Days diff: ', daysDiff);
	return daysDiff;
}
