import { updateObject } from '$lib/server/updateObject';
import type { Milestone } from '$lib/Feature_Milestones/types';

async function updateMilestone(id: string, milestone: Milestone) {
	try {
		const response = await updateObject('milestones', id, { $set: { ...milestone } });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { updateMilestone };
