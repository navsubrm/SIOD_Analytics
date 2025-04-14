import { ObjectId } from 'mongodb';
import * as TrackingItemModel from '$lib/models/TrackingItemModel';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return {
		trackingItems: await TrackingItemModel.fetchTrackingItems()
	};
};

export const actions = {
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
	}
} satisfies Actions;
