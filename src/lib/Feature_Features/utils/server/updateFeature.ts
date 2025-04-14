import { updateObject } from '$lib/server/updateObject';
import type { Feature } from '$lib/Feature_Features/types';

async function updateFeature(id: string, feature: Feature) {
	try {
		const response = await updateObject('features', id, { $set: { ...feature } });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { updateFeature };
