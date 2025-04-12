import { ObjectId } from 'mongodb';
import { testJSON } from '$lib/utils/testJson';

function validateEstimate(
	completionPercentile: number,
	trackingEvent: string,
	estimateDate: string
) {
	const validations: TrackingItemValidations = {};

	if (!completionPercentile) validations.missingCompletionPercentile = true;
	if (isNaN(completionPercentile)) validations.invalidCompletionPercentile = true;
	if (!estimateDate) validations.missingEstimateDate = true;
	if (isNaN(new Date(estimateDate).getTime())) validations.invalidEstimateDate = true;
	if (testJSON(trackingEvent)) {
		const id = JSON.parse(trackingEvent).value;
		if (!ObjectId.isValid(id)) validations.invalidTrackingEventId = true;
	} else {
		validations.missingTrackingEvent = true;
	}

	return validations;
}

export { validateEstimate };
