import { postNewObject } from '$lib/server/postNewObject';
import type { JIRATicket } from '../../types';

async function postJiraTicket(item: JIRATicket) {
	try {
		const response = await postNewObject('jira-tickets', { ...item });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postJiraTicket };
