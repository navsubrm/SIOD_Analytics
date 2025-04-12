import { json } from '@sveltejs/kit';
import { getTrackingEventList } from '$lib/TrackingEvents/utils/getTrackingEventList';

export async function GET() {
	const response = await getTrackingEventList();

	if (!response) {
		console.log('Failed response from getTrackingEventList api route.');
		return json([]);
	}

	const list = response.map((el: TrackingEvent) => {
		return { label: el.name, value: el._id };
	});

	return json(list);
}
