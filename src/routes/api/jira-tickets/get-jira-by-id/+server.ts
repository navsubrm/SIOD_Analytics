import { json } from '@sveltejs/kit';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
import { getJiraTicketById } from '$lib/Feature_JiraTickets/utils/server/getJiraTicketById';
export async function GET({ url }) {
	const id: string | null = url.searchParams.get('id');

	if (!id) return json({});

	const response: JIRATicket | false = await getJiraTicketById(id);

	if (response) return json(response);

	return json({ error: 'Fetch Failed.' });
}
