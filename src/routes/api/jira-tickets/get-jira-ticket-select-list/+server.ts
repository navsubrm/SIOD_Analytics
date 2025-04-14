import { json } from '@sveltejs/kit';
import { getJiraTicketList } from '$lib/Feature_JiraTickets/utils/getJiraTicketList';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

export async function GET() {
	const response = await getJiraTicketList();

	if (!response) {
		console.log('Failed response from getTrackingEventList api route.');
		return json([]);
	}

	const list = response.map((el: JIRATicket) => {
		return { label: el.name, value: el._id };
	});

	return json(list);
}
