import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import { mongoInit } from './connect';
import { testJSON } from '$lib/HelperFunctions/testJson';

const client: MongoClient = await mongoInit();
const db: Db = client.db('siod_analytics');
const collection: Collection = db.collection('tracking_items');

//Validation Methods:
function validateEndDate(date: Date | string) {
	const validations: TrackingItemValidations = {};
	if (!date) validations.missingDate = true;
	if (isNaN(new Date(date).getTime())) validations.invalidDate = true;
	return validations;
}

function initializeEndDate(date: Date | string) {
	return {
		_id: new ObjectId().toString(),
		date: new Date(date),
		createdAt: new Date()
	};
}

function validatePriority(priority: number) {
	const validations: TrackingItemValidations = {};
	if (!priority) validations.missingPriority = true;
	if (isNaN(priority)) validations.invalidPriority = true;

	return validations;
}

function initializePriority(priority: number) {
	return {
		_id: new ObjectId().toString(),
		priority: Number(priority),
		createdAt: new Date()
	};
}

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

async function createTrackingItem(item: TrackingItem) {
	try {
		const response = await collection.insertOne({ ...item });
		return response;
	} catch (err) {
		console.log('Error from tracking item: ', err);
		return { status: 500 };
	}
}

async function fetchTrackingItems() {
	try {
		const response = await collection
			.find({})
			.map(({ _id, ...d }) => ({ _id: _id.toString(), ...d }))
			.toArray();

		return response;
	} catch (err) {
		console.log('Error from get Tracking Items: ', err);
		return [];
	}
}

async function fetchTrackingItemById(id: string) {
	try {
		const response = await collection.findOne({ _id: new ObjectId(id) });

		return response;
	} catch (err) {
		console.log('Error from get tracking item by ID: ', err);
		return '';
	}
}

async function updateTrackingItemSingle(item: TrackingItem) {
	const id = item._id as string;
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					name: item.name,
					details: item.details,
					startDate: item.startDate,
					coreCapability: item.coreCapability,
					updatedAt: new Date()
				}
			}
		);
		return response;
	} catch (err) {
		console.log('Error fro Tracking Item Update Single: ', err);
		return { status: 500 };
	}
}

async function pushPriorityAssignment(id: string, priorityObject: TrackingItemPriority) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					priorityAssignments: {
						$each: [{ ...priorityObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from priority push: ', err);
	}
}

async function pushNewAssessment(id: string, estimateObject: TrackingItemEstimate) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					estimates: {
						$each: [{ ...estimateObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from Estimate Push: ', err);
		return { status: 500 };
	}
}

async function pushNewEndDate(id: string, endDateObject: ProjectedEndDate) {
	try {
		const response = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$push: {
					estimates: {
						$each: [{ ...endDateObject }],
						$sort: { createdAt: -1 }
					}
				}
			}
		);

		return response;
	} catch (err) {
		console.log('Error from end date push: ', err);
		return { status: 500 };
	}
}

export {
	validateEndDate,
	validatePriority,
	validateEstimate,
	validateTrackingItem,
	initializeEndDate,
	initializePriority,
	initializeEstimate,
	initializeTrackingItem,
	createTrackingItem,
	fetchTrackingItems,
	fetchTrackingItemById,
	updateTrackingItemSingle,
	pushPriorityAssignment,
	pushNewAssessment,
	pushNewEndDate
};
