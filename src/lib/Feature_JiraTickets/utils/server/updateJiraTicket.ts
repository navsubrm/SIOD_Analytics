import { updateObject } from '$lib/server/updateObject';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

async function updateJiraTicket(id: string, jiraTicket: JIRATicket) {
	try {
		const response = await updateObject('jira-tickets', id, { $set: { ...jiraTicket } });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { updateJiraTicket };
