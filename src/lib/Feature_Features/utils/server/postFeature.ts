import { postNewObject } from '$lib/server/postNewObject';
import type { Feature } from '../../types';

async function postFeature(item: Feature) {
	try {
		const response = await postNewObject('features', { ...item });

		return response;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { postFeature };
