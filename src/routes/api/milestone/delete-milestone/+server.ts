import { json } from '@sveltejs/kit';
import { deleteMilestone } from '$lib/Feature_Milestones/utils/server/deleteMilestone';

export async function DELETE({ request }) {
	const { id } = await request.json();

	if (!id) return json({ error: 'Delete failed! Object not found.' });

	const response = await deleteMilestone(id);

	if (response) return json(response);

	return json({ error: 'Fetch Failed.' });
}
