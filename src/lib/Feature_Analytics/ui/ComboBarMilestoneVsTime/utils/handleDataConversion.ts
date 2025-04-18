import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
import { handleTicketDataConversion } from './handleTicketDataConversion';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

function handleDataConversion(displaySet: JIRATicket[]) {
	return displaySet
		.map((ticket) => {
			const totalDays = getDaysBetweenDates(ticket?.plannedReleaseDate, ticket?.startDate as Date);
			const ticketArray = handleTicketDataConversion(ticket, totalDays);
			return [...ticketArray];
		})
		.flat();
}

export { handleDataConversion };
