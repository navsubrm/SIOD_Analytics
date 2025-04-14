import {
	validateEndDate,
	validatePriority,
	validateEstimate,
	validateTrackingItem,
	initializeEndDate,
	initializePriority,
	initializeEstimate,
	initializeTrackingItem
} from '../index';

const validateNewFormData = async (formData) => {
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
		...validateEndDate(projectedEndDate),
		...validatePriority(priority),
		...validateEstimate(0, trackingEvent, estimateDate),
		...validateTrackingItem(name, details, trackingEvent, coreCapability, startDate)
	};

	if (Object.keys(validation).length > 0) return { ...formData, ...validation };

	const newEndDate = initializeEndDate(projectedEndDate);
	const newPriority = initializePriority(priority);
	const newEstimate = initializeEstimate(0, trackingEvent, estimateDate);

	const newItem = initializeTrackingItem(
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

export { validateNewFormData };
