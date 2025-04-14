import { getObjectById } from '$lib/server/getObjectById';

async function getJiraTicketById(id: string) {
	try {
		const response = await getObjectById('jira-tickets', id);

		return response || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getJiraTicketById };
