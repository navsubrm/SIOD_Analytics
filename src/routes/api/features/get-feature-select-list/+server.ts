import { json } from '@sveltejs/kit';
import type { Feature } from '$lib/Feature_Features/types';
import { getFeatureList } from '$lib/Feature_Features/utils/server/getFeatureList';

export async function GET() {
	const response = await getFeatureList();

	if (!response) {
		console.log('Failed response from getFeatureList api route.');
		return json([]);
	}

	const list = response.map((el: Feature) => {
		return { label: el.name, value: el._id };
	});

	return json(list);
}
