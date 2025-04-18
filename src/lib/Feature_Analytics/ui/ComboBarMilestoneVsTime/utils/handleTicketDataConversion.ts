import { projectionEstimates } from './projectionEstimates';
import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
import type { ReleaseStage } from '$lib/Feature_Releases/types';

function handleTicketDataConversion(ticket: JIRATicket, totalDays: number) {
	const ticketData = (ticket?.releaseStages as ReleaseStage[]).map((stage) => {
		const stageDays = !stage.date ? 0 : getDaysBetweenDates(ticket?.startDate as Date, stage.date);
		const actualPercentile = stageDays == 0 ? 0 : totalDays / stageDays;
		const projectedPercentile = projectionEstimates.find((el) => el.stage == stage.stage);

		console.log(
			'Values from ticket: ',
			ticket.name,
			actualPercentile,
			projectedPercentile?.projectedTime
		);

		return {
			group: `${ticket?.feature?.label}: ${ticket.name}`,
			key: stage.stage as string,
			value: !projectedPercentile ? 0 : actualPercentile - projectedPercentile.projectedTime
		};
	});
	return ticketData;
}

export { handleTicketDataConversion };
