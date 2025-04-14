import { ObjectId } from 'mongodb';
import type { JIRAForm } from '../../types';
import { initializeJiraObject } from '../initializeJiraObject';
import { validateJiraObject } from '../validateJiraObject';
import { updateJiraTicket } from './updateJiraTicket';

async function handleUpdateJiraTicket(data: JIRAForm) {
	const validations = validateJiraObject(
		data?.name,
		data?.details as string,
		data?.startDate?.toString() as string,
		data?.plannedReleaseDate?.toString() as string,
		data?.priority?.toString(),
		data?.milestones.toString(),
		data?.opr?.toString() as string
	);

	if (!ObjectId.isValid(data.id as string)) return { success: false, dbFail: true };
	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newJiraTicket = initializeJiraObject(data);

	const response = updateJiraTicket(data.id as string, { ...newJiraTicket });

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handleUpdateJiraTicket };
