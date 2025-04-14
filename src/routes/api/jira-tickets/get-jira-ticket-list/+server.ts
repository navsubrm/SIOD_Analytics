import { json } from '@sveltejs/kit';
import { getJiraTicketList } from '$lib/Feature_JiraTickets/utils/getJiraTicketList';
export async function GET() {
	const response = await getJiraTicketList();

	if (!response) {
		console.log('Failed response from getJiraTicketList api route.');
		return json([]);
	}

	return json(response);
}
