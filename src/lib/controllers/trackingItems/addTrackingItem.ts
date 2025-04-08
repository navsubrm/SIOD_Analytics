//import { ObjectId } from 'mongodb';
import * as TrackingItemModel from '$lib/models/NewTrackingItemModel';

const handleNewTrackingItemFormData = async (formData) => {
	const projectedEndDate = formData?.['projected-end-date'].toString();
	const priority = formData.priority.toString();
	const trackingEvent = formData['initial-reason'].toString();
	const estimateDate = formData?.['estimate-date'];
	const name = formData.name.toString();
	const details = formData.details.toString();
	const coreCapability = JSON.parse(formData['core-capability'].toString()).value;
	const startDate = formData['start-date'].toString();
	const parentValues = JSON.parse(formData['parent-id'].toString());

	const validation: TrackingItemValidations = {
		...TrackingItemModel.validateEndDate(projectedEndDate),
		...TrackingItemModel.validatePriority(priority),
		...TrackingItemModel.validateEstimate(0, trackingEvent, estimateDate),
		...TrackingItemModel.validateTrackingItem(
			name,
			details,
			trackingEvent,
			coreCapability,
			startDate
		)
	};

	if (Object.keys(validation).length > 0) return { ...formData, ...validation };

	const newEndDate = TrackingItemModel.initializeEndDate(projectedEndDate);
	const newPriority = TrackingItemModel.initializePriority(priority);
	const newEstimate = TrackingItemModel.initializeEstimate(0, trackingEvent, estimateDate);

	const newItem = TrackingItemModel.initializeTrackingItem(
		name,
		details,
		trackingEvent,
		coreCapability,
		startDate,
		parentValues
	);

	newItem.projectedEndDates = [newEndDate];
	newItem.priorityAssignments = [newPriority];
	newItem.estimates = [newEstimate];

	return newItem;
};

const handleDatabaseAdd = async (newItem: TrackingItem) => {
	await TrackingItemModel.createTrackingItem(newItem);

	return { success: true };
};

export { handleNewTrackingItemFormData, handleDatabaseAdd };
