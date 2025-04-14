import { json } from '@sveltejs/kit';
import type { Feature } from '$lib/Feature_Features/types';
import { getFeatureById } from '$lib/Feature_Features/utils/server/getFeatureById';

export async function GET({ url }) {
	const id: string | null = url.searchParams.get('id');

	if (!id) return json({});

	const response: Feature | false = await getFeatureById(id);

	if (response) return json(response);

	return json({ error: 'Fetch Failed.' });
}
