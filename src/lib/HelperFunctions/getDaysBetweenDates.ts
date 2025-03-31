export function getDaysBetweenDates(date1: Date, date2: Date) {
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return daysDiff;
}
