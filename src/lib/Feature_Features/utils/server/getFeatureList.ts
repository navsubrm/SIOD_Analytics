import { getObjectList } from '$lib/server/getObjectList';

async function getFeatureList() {
	try {
		const list = await getObjectList('features', {}, { milestone: 1, priority: 1 });

		if (list) return list;
		return [];
	} catch (err) {
		console.log('Error from get feature list: ', err);
		return false;
	}
}

export { getFeatureList };
