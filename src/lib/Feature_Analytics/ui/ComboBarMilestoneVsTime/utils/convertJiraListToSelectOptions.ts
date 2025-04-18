import type { JIRATicket, SelectItem } from '$lib/Feature_JiraTickets/types';

function convertJiraListToSelectOptions(activeList: JIRATicket[]): SelectItem[] {
	return activeList.map((el) => {
		const milestone = el?.milestones as SelectItem;
		return {
			value: el._id as string,
			label: `${el?.feature?.label} ${el.name}: ${milestone?.label}`
		};
	});
}

export { convertJiraListToSelectOptions };
