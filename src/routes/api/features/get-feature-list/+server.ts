import { json } from '@sveltejs/kit';
import { getFeatureList } from '$lib/Feature_Features/utils/server/getFeatureList';

export async function GET() {
	const response = await getFeatureList();

	if (!response) {
		console.log('Failed response from getFeatureList api route.');
		return json([]);
	}

	return json(response);
}
