import { deleteObject } from '$lib/server/deleteObject';

async function deleteFeature(id: string) {
	try {
		const response = await deleteObject('features', id);

		return response;
	} catch (err) {
		console.log(err);

		return false;
	}
}

export { deleteFeature };
