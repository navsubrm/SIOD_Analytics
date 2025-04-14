import { json } from '@sveltejs/kit';
import type { Milestone } from '$lib/Feature_Milestones/types';
import { getMilestoneList } from '$lib/Feature_Milestones/utils/server/getMilestoneList';

export async function GET() {
	const response = await getMilestoneList();

	if (!response) {
		console.log('Failed response from getMilestoneList api route.');
		return json([]);
	}

	const list = response.map((el: Milestone) => {
		return { label: el.name, value: el._id };
	});

	return json(list);
}
