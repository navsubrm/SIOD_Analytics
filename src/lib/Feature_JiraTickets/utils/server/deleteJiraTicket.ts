import { deleteObject } from '$lib/server/deleteObject';

async function deleteJiraTicket(id: string) {
	try {
		const response = await deleteObject('jira-tickets', id);

		return response;
	} catch (err) {
		console.log(err);

		return false;
	}
}

export { deleteJiraTicket };
