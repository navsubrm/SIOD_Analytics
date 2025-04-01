import { getDaysBetweenDates } from './getDaysBetweenDates';
import { truncateToDecimalPlaces } from './truncateNumber';

export function checkConfidenceOfTrackingItem(item: TrackingItem) {
	//Take the item start and most current end date, get total days allotted.
	const startDate = item.startDate;
	const endDate = item.projectedEndDates[0].date;
	const dayTotal = getDaysBetweenDates(startDate, endDate);

	//Get total days used since start
	const completionEstimateDate = item.estimates[0].createdAt;
	const daysSinceStart = getDaysBetweenDates(startDate, completionEstimateDate);

	//Get percentage of total time used since start.
	const daysUsedPercent = (daysSinceStart / dayTotal) * 100;

	//Get task completion percentage
	const completionPercentage = item.estimates[0].completionPercentile;

	//Return percent of time used and percent of task complete for comparison.

	const completionReturn = truncateToDecimalPlaces(completionPercentage);
	const daysUsedReturn = truncateToDecimalPlaces(daysUsedPercent);
	const compDaysDelta = truncateToDecimalPlaces(completionReturn - daysUsedReturn);

	return [completionReturn, daysUsedReturn, compDaysDelta];
}
