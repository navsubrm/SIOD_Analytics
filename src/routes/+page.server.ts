import { fail } from '@sveltejs/kit';

//Load function imports:
import { getJiraTicketList } from '$lib/Feature_JiraTickets/utils/getJiraTicketList';
import { getMilestoneList } from '$lib/Feature_Milestones/utils/server/getMilestoneList';

//Action function imports:
//New Post:
import { handlePOSTNewMilestone } from '$lib/Feature_Milestones/utils/server/handlePOSTNewMilestone';
import { handlePOSTNewFeature } from '$lib/Feature_Features/utils/server/handlePOSTNewFeature';
import { handlePOSTNewJiraTicket } from '$lib/Feature_JiraTickets/utils/server/handlePOSTNewJiraTicket';
//Update:
import { handleUpdateFeature } from '$lib/Feature_Features/utils/server/handleUpdateFeature';
import { handleUpdateRelease } from '$lib/Feature_Releases/utils/server/handleUpdateRelease';
import { handleUpdateJiraTicket } from '$lib/Feature_JiraTickets/utils/server/handleUpdateJiraTicket';
import { handleUpdateMilestone } from '$lib/Feature_Milestones/utils/server/handleUpdateMilestone';

//Delete:
import { handleDeleteRelease } from '$lib/Feature_Releases/utils/server/handleDeleteRelease';

//Import Types:
import type { Actions } from './$types';
import type { MilestoneForm } from '$lib/Feature_Milestones/types';
import type { FeatureForm } from '$lib/Feature_Features/types';
import type { ReleaseForm } from '$lib/Feature_Releases/types';
import type { JIRAForm } from '$lib/Feature_JiraTickets/types';

export async function load() {
	return {
		jiraTickets: await getJiraTicketList(),
		milestones: await getMilestoneList()
	};
}

export const actions = {
	'post-new-milestone': async ({ request }) => {
		const data: MilestoneForm = Object.fromEntries(await request.formData());
		const result = await handlePOSTNewMilestone(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'edit-milestone': async ({ request }) => {
		const data: MilestoneForm = Object.fromEntries(await request.formData());
		const result = await handleUpdateMilestone(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'post-new-feature': async ({ request }) => {
		const data: FeatureForm = Object.fromEntries(await request.formData());
		const result = await handlePOSTNewFeature(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'edit-feature': async ({ request }) => {
		const data: FeatureForm = Object.fromEntries(await request.formData());
		const result = await handleUpdateFeature(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'edit-release': async ({ request, url }) => {
		const collection = url?.searchParams.get('collection');
		const data: ReleaseForm = Object.fromEntries(await request.formData());
		//console.log('Data from server: ', data);
		const result = await handleUpdateRelease(data, collection);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'delete-release': async ({ request, url }) => {
		const collection = url?.searchParams.get('collection');
		const data: ReleaseForm = Object.fromEntries(await request.formData());
		//console.log('Data from delete server: ', data);
		const result = await handleDeleteRelease(data, collection);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'post-new-jira-ticket': async ({ request }) => {
		const data: JIRAForm = Object.fromEntries(await request.formData());
		const result = await handlePOSTNewJiraTicket(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	},
	'edit-jira-ticket': async ({ request }) => {
		const data: JIRAForm = Object.fromEntries(await request.formData());
		console.log('Data from Jira Form: ', data);
		const result = await handleUpdateJiraTicket(data);
		if (result?.dbFail) return fail(500, { result, data });
		if (!result.success) return fail(409, { result, data });
		return { success: true, data };
	}

	// 'reason-for-update': async ({ request }) => {
	// 	const data = Object.fromEntries(await request.formData());

	// 	const newEvent: TrackingEvent = {
	// 		name: data.name.toString(),
	// 		startDate: data['event-start'].toString(),
	// 		endDate: data['event-end'].toString(),
	// 		createdAt: new Date(new Date().toLocaleDateString())
	// 	};

	// 	if (data?.['associated-event-id'])
	// 		newEvent.associatedEventId = JSON.parse(data['associated-event-id'].toString()).value;

	// 	await TrackingEventModel.createTrackingEvent(newEvent);

	// 	return { success: true };
	// },
	// 'add-tracking-item': async ({ request }) => {
	// 	const data = Object.fromEntries(await request.formData());

	// 	console.log('New item data: ', data);

	// 	const newItem: TrackingItem = {
	// 		name: data.name.toString(),
	// 		details: data.details.toString(),
	// 		initialReasonId: JSON.parse(data['initial-reason'].toString()).value,
	// 		initialReason: JSON.parse(data['initial-reason'].toString()).label,
	// 		coreCapability: JSON.parse(data['core-capability'].toString()).value,
	// 		startDate: new Date(data['start-date'].toString()),
	// 		projectedEndDates: [
	// 			{
	// 				_id: new ObjectId().toString(),
	// 				date: new Date(data['projected-end-date'].toString()),
	// 				createdAt: new Date()
	// 			}
	// 		],
	// 		priorityAssignments: [
	// 			{ _id: new ObjectId().toString(), priority: Number(data.priority), createdAt: new Date() }
	// 		],
	// 		estimates: [],
	// 		createdAt: new Date()
	// 	};

	// 	if (data?.['parent-id']) {
	// 		newItem.parentId = JSON.parse(data['parent-id'].toString()).value;
	// 		newItem.parentName = JSON.parse(data['parent-id'].toString()).label;
	// 	}
	// 	await TrackingItemModel.createTrackingItem(newItem);

	// 	return { success: true };
	// },
	// 'edit-tracking-item': async ({ request }) => {
	// 	const data = Object.fromEntries(await request.formData());

	// 	const newItem: TrackingItem = {
	// 		_id: data.id.toString(),
	// 		name: data.name.toString(),
	// 		details: data.details.toString(),
	// 		startDate: new Date(data['start-date'].toString()),
	// 		coreCapability: JSON.parse(data['core-capability'].toString()).value,
	// 		updatedAt: new Date()
	// 	};

	// 	if (data?.['parent-id']) {
	// 		newItem.parentId = JSON.parse(data['parent-id'].toString()).value;
	// 		newItem.parentName = JSON.parse(data['parent-id'].toString()).label;
	// 	}
	// 	await TrackingItemModel.editTrackingItem(newItem);

	// 	return { success: true };
	// },
	// 'add-estimate-data': async ({ request }) => {
	// 	const data = Object.fromEntries(await request.formData());

	// 	const recordId = data['tracking-item-id'].toString();
	// 	const trackingEvent = JSON.parse(data['event-id'].toString());

	// 	const newEstimate: TrackingItemEstimate = {
	// 		_id: new ObjectId().toString(),
	// 		completionPercentile: Number(data['comp-percentile']),
	// 		trackingEventId: trackingEvent.value,
	// 		trackingEventName: trackingEvent.label,
	// 		createdAt: new Date()
	// 	};

	// 	await TrackingItemModel.postNewEstimate(recordId, newEstimate);

	// 	return { success: true };
	// }
} satisfies Actions;
