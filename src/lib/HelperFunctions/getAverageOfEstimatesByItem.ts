import { getDaysBetweenDates } from './getDaysBetweenDates';
import { truncateToDecimalPlaces } from './truncateNumber';

export function getAverageEstimates(estimates: TrackingItemEstimate[]): (string | number)[] {
	if (estimates.length < 1) return [0, 0, 0, 0];
	let confSum = 0;
	let compSum = 0;
	const eventArray: string[] = [];
	const start = estimates[0]?.createdAt;
	const end = estimates?.[estimates.length - 1].createdAt;
	const daysBetween = getDaysBetweenDates(start, end);

	for (let i = 0; i < estimates.length - 1; i++) {
		confSum += estimates[i].confidencePercentile;
		compSum += estimates[i].completionPercentile;
		if (estimates[i].trackingEventId) eventArray.push(estimates[i].trackingEventId as string);
	}

	//console.log('Sum: ', confSum, compSum);

	const eventArraySet = Array.from(new Set(eventArray));
	const confidenceAvg = confSum / estimates.length;
	const completionAvg = compSum / estimates.length;

	//console.log('Value Ave: ', confidenceAvg, completionAvg, estimates.length);

	return [
		truncateToDecimalPlaces(confidenceAvg, 2),
		truncateToDecimalPlaces(completionAvg, 2),
		daysBetween,
		eventArraySet.length
	];
}
