import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
import type { ReleaseStage } from '$lib/Feature_Releases/types';
import { calcAverage } from './calcAverage';

function formatTicketByStageData(jiraList: JIRATicket[]) {
	let data: { group: string; value: number }[] | [] = [];
	const categories: any = { unk: 0 };
	const totalItems = jiraList?.length;

	console.log('jiraList from formatTicketByStage: ', jiraList);

	jiraList?.forEach((el: JIRATicket) => {
		const completed: ReleaseStage[] = el?.releaseStages?.filter(
			(el) => el?.date !== null
		) as ReleaseStage[];

		if (completed?.length < 1) {
			categories['unk']++;
		} else {
			if (Object.hasOwn(categories, completed[completed.length - 1].stage)) {
				categories[completed[completed.length - 1].stage]++;
			} else {
				categories[completed[completed.length - 1].stage] = 1;
			}
		}
	});

	Object.entries(categories).forEach((el) => {
		data = [...data, { group: el[0], value: calcAverage(totalItems, el[1] as number) }];
	});

	console.log('Data from format ticket data (tickets by stage): ', data);

	return data;
}

export { formatTicketByStageData };
