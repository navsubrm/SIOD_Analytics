import { json } from '@sveltejs/kit';
import { deleteFeature } from '$lib/Feature_Features/utils/server/deleteFeature';

export async function DELETE({ request }) {
	const { id } = await request.json();

	if (!id) return json({ error: 'Delete failed! Object not found.' });

	const response = await deleteFeature(id);

	if (response) return json(response);

	return json({ error: 'Fetch Failed.' });
}
