import { truncateToDecimalPlaces } from './truncateNumber';

export function getPriorAverageEstimates(estimates: TrackingItemEstimate[]): (string | number)[] {
	if (estimates.length < 1) return [0, 0, 0, 0];
	let confSum = 0;
	let compSum = 0;

	for (let i = 1; i < estimates.length - 1; i++) {
		confSum += estimates[i].confidencePercentile;
		compSum += estimates[i].completionPercentile;
	}

	//console.log('Prior Value sum: ', confSum, compSum);

	const confidenceAvg = confSum / (estimates.length - 1);
	const completionAvg = compSum / (estimates.length - 1);

	//console.log('Prior Value Ave: ', confidenceAvg, completionAvg, estimates.length - 1);

	return [truncateToDecimalPlaces(confidenceAvg, 2), truncateToDecimalPlaces(completionAvg, 2)];
}
