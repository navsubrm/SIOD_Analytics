import { json } from '@sveltejs/kit';
import type { Milestone } from '$lib/Feature_Milestones/types';
import { getMilestoneById } from '$lib/Feature_Milestones/utils/server/getMilestoneById';

export async function GET({ url }) {
	const id: string | null = url.searchParams.get('id');

	if (!id) return json({});

	const response: Milestone | false = await getMilestoneById(id);

	if (response) return json(response);

	return json({ error: 'Fetch Failed.' });
}
