import { getObjectList } from '$lib/server/getObjectList';
import { json } from '@sveltejs/kit';

export async function GET() {
	const nextMilestone = await getObjectList(
		'milestones',
		{ name: true, startDate: true },
		{ startDate: -1 },
		{ startDate: { $gte: new Date() } },
		1
	);

	console.log('Next milestone return: ', nextMilestone);

	return json(nextMilestone);
}
