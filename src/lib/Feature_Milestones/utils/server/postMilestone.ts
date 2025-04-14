import { postNewObject } from '$lib/server/postNewObject';
import type { Milestone } from '../../types';

async function postMilestone(item: Milestone) {
	try {
		const response = await postNewObject('milestones', { ...item });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postMilestone };
