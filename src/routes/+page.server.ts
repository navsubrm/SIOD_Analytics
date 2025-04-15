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
} satisfies Actions;
