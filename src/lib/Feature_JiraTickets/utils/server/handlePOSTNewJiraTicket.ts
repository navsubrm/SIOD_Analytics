import type { JIRAForm } from '../../types';
import { initializeJiraObject } from '../initializeJiraObject';
import { validateJiraObject } from '../validateJiraObject';
import { postJiraTicket } from './postJiraTicket';

async function handlePOSTNewJiraTicket(data: JIRAForm) {
	const validations = validateJiraObject(
		data?.name,
		data?.details as string,
		data?.startDate?.toString() as string,
		data?.plannedReleaseDate?.toString() as string,
		data?.priority?.toString(),
		data?.milestones,
		data?.opr?.toString() as string
	);

	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newJiraTicket = initializeJiraObject(data);

	const response = postJiraTicket(newJiraTicket);

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handlePOSTNewJiraTicket };
