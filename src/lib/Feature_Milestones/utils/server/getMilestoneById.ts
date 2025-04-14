import { getObjectById } from '$lib/server/getObjectById';

async function getMilestoneById(id: string) {
	try {
		const response = await getObjectById('milestones', id);

		return response || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getMilestoneById };
