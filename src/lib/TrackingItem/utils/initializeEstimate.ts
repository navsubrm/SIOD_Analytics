import { ObjectId } from 'mongodb';

function initializeEstimate(
	completionPercentile: number,
	trackingEvent: string,
	estimateDate: string
) {
	return {
		_id: new ObjectId().toString(),
		completionPercentile,
		trackingEventId: JSON.parse(trackingEvent).value,
		trackingEventName: JSON.parse(trackingEvent).label,
		estimateDate: new Date(estimateDate),
		createdAt: new Date()
	};
}

export { initializeEstimate };
