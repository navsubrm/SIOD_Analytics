import { ObjectId } from 'mongodb';

function initializeTrackingItem(
	name: string,
	details: string,
	trackingEvent: string,
	coreCapability: string,
	startDate: string,
	parentValues: string
) {
	const newTrackingItem: TrackingItem = {
		name,
		details,
		initialReasonId: JSON.parse(trackingEvent).value,
		initialReason: JSON.parse(trackingEvent).label,
		coreCapability,
		startDate: new Date(startDate),
		createdAt: new Date(),
		projectedEndDates: [],
		priorityAssignments: [],
		estimates: []
	};

	if (ObjectId.isValid(JSON.parse(parentValues))) {
		newTrackingItem.parentId = JSON.parse(parentValues).value;
		newTrackingItem.parentName = JSON.parse(parentValues).label;
	}

	return newTrackingItem;
}

export { initializeTrackingItem };
