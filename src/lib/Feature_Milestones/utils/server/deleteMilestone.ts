import { deleteObject } from '$lib/server/deleteObject';

async function deleteMilestone(id: string) {
	try {
		const response = await deleteObject('milestones', id);

		return response;
	} catch (err) {
		console.log(err);

		return false;
	}
}

export { deleteMilestone };
