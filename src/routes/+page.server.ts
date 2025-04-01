import { ObjectId } from 'mongodb';
import * as TrackingItemModel from '$lib/dbFiles/TrackingItemModel';
import * as TrackingEventModel from '$lib/dbFiles/TrackingEventModel';
import type { Actions } from './$types';

export async function load() {
	return {
		trackingItems: await TrackingItemModel.fetchTrackingItems(),
		reasonForUpdate: await TrackingEventModel.fetchTrackingEvents()
	};
}

export const actions = {
	'reason-for-update': async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const newEvent: TrackingEvent = {
			name: data.name.toString(),
			startDate: data['event-start'].toString(),
			endDate: data['event-end'].toString(),
			createdAt: new Date(new Date().toLocaleDateString())
		};

		if (data?.['associated-event-id'])
			newEvent.associatedEventId = JSON.parse(data['associated-event-id'].toString()).value;

		await TrackingEventModel.createTrackingEvent(newEvent);

		return { success: true };
	},
	'add-tracking-item': async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		console.log('New item data: ', data);

		const newItem: TrackingItem = {
			name: data.name.toString(),
			details: data.details.toString(),
			initialReasonId: JSON.parse(data['initial-reason'].toString()).value,
			initialReason: JSON.parse(data['initial-reason'].toString()).label,
			coreCapability: JSON.parse(data['core-capability'].toString()).value,
			startDate: new Date(data['start-date'].toString()),
			projectedEndDates: [
				{
					_id: new ObjectId().toString(),
					date: new Date(data['projected-end-date'].toString()),
					createdAt: new Date()
				}
			],
			priorityAssignments: [
				{ _id: new ObjectId().toString(), priority: Number(data.priority), createdAt: new Date() }
			],
			estimates: [],
			createdAt: new Date()
		};

		if (data?.['parent-id']) {
			newItem.parentId = JSON.parse(data['parent-id'].toString()).value;
			newItem.parentName = JSON.parse(data['parent-id'].toString()).label;
		}
		await TrackingItemModel.createTrackingItem(newItem);

		return { success: true };
	},
	'edit-tracking-item': async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const newItem: TrackingItem = {
			_id: data.id.toString(),
			name: data.name.toString(),
			details: data.details.toString(),
			startDate: new Date(data['start-date'].toString()),
			coreCapability: JSON.parse(data['core-capability'].toString()).value,
			updatedAt: new Date()
		};

		if (data?.['parent-id']) {
			newItem.parentId = JSON.parse(data['parent-id'].toString()).value;
			newItem.parentName = JSON.parse(data['parent-id'].toString()).label;
		}
		await TrackingItemModel.editTrackingItem(newItem);

		return { success: true };
	},
	'add-estimate-data': async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const recordId = data['tracking-item-id'].toString();
		const trackingEvent = JSON.parse(data['event-id'].toString());

		const newEstimate: TrackingItemEstimate = {
			_id: new ObjectId().toString(),
			completionPercentile: Number(data['comp-percentile']),
			trackingEventId: trackingEvent.value,
			trackingEventName: trackingEvent.label,
			createdAt: new Date()
		};

		await TrackingItemModel.postNewEstimate(recordId, newEstimate);

		return { success: true };
	}
} satisfies Actions;
