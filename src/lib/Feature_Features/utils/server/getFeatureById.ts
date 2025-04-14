import { getObjectById } from '$lib/server/getObjectById';

async function getFeatureById(id: string) {
	try {
		const response = await getObjectById('features', id);

		return response || false;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { getFeatureById };
