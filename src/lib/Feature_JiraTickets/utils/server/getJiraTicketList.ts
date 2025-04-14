import { getObjectList } from '$lib/server/getObjectList';

async function getJiraTicketList() {
	try {
		const list = await getObjectList('jira-tickets');

		if (list) return list;
		return [];
	} catch (err) {
		console.log('Error from get jiraTicket list: ', err);
		return false;
	}
}

export { getJiraTicketList };
