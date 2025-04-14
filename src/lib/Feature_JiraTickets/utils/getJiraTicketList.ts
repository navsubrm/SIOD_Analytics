import { getObjectList } from '$lib/server/getObjectList';

async function getJiraTicketList() {
	try {
		const list = await getObjectList('tracking_items');

		if (list) return list;
		return [];
	} catch (err) {
		console.log('Error from get milestone list: ', err);
		return false;
	}
}

export { getJiraTicketList };
