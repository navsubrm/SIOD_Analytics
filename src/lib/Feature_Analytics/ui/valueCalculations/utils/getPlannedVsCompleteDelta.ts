import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

function getPlannedVsCompleteDelta(activeList: JIRATicket[]): number {
	let deltaSum = 0;

	activeList.forEach((el: JIRATicket) => {
		const endDate = el?.plannedReleaseDate;
		let releaseDate = endDate;
		if (el.releaseStages[el.releaseStages.length - 1]?.date !== null) {
			releaseDate = el.releaseStages[el.releaseStages.length - 1]?.date;
		}

		let delta = getDaysBetweenDates(new Date(endDate), new Date(releaseDate));

		if (new Date(endDate) < new Date(releaseDate)) {
			delta *= -1;
		}

		deltaSum += delta;
	});

	return deltaSum;
}

export { getPlannedVsCompleteDelta };
