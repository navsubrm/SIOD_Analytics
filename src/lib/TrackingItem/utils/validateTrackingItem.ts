import { ObjectId } from 'mongodb';
import { testJSON } from '$lib/utils/testJson';

function validateTrackingItem(
	name: string,
	details: string,
	trackingEvent: string,
	coreCapability: string,
	startDate: string
) {
	const validations: TrackingItemValidations = {};
	if (!name || name == '') validations.missingName = true;
	if (!details || details == '') validations.missingDetails = true;
	if (!coreCapability || coreCapability == '') validations.missingCoreCapability = true;
	if (isNaN(new Date(startDate).getTime())) validations.invalidStartDate = true;
	if (testJSON(trackingEvent)) {
		const id = JSON.parse(trackingEvent).value;
		if (!ObjectId.isValid(id)) validations.invalidTrackingEventId = true;
	} else {
		validations.missingTrackingEvent = true;
	}

	return validations;
}

export { validateTrackingItem };
