import { json } from '@sveltejs/kit';
import { getTrackingItemList } from '$lib/TrackingItem/utils/getTrackingItemList';

export async function GET() {
	const response = await getTrackingItemList();

	if (!response) {
		console.log('Failed response from getTrackingEventList api route.');
		return json([]);
	}

	const list = response.map((el: TrackingItem) => {
		return { label: el.name, value: el._id };
	});

	return json(list);
}
