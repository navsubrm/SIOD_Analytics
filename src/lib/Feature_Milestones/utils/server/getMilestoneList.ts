import { getObjectList } from '$lib/server/getObjectList';

async function getMilestoneList() {
	try {
		const list = await getObjectList('milestones', {}, { startDate: 1 });

		if (list) return list;
		return [];
	} catch (err) {
		console.log('Error from get milestone list: ', err);
		return false;
	}
}

export { getMilestoneList };
