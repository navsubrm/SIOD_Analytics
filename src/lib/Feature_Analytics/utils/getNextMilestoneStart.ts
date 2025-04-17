import { getDaysBetweenDates } from './getDaysBetweenDates';
import type { Milestone } from '$lib/Feature_Milestones/types';

function getNextMilestoneStart(milestones: Milestone[]) {
	const futureMilestones = milestones.filter((el) => {
		//console.log('Element from get next: ', el);
		if (new Date(el?.startDate as Date).valueOf() > new Date().valueOf()) return el;
	});

	return {
		name: futureMilestones[0]?.name,
		days: getDaysBetweenDates(new Date(futureMilestones[0]?.startDate as Date), new Date())
	};
}

export { getNextMilestoneStart };
