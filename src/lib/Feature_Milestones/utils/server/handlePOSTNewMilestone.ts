import type { MilestoneForm } from '../../types';
import { initializeMilestoneObject } from '../initializeMilestoneObject';
import { validateMilestoneInputs } from '../validateMilestoneInputs';
import { postMilestone } from './postMilestone';

async function handlePOSTNewMilestone(data: MilestoneForm) {
	const validations = validateMilestoneInputs(
		data.name.toString(),
		data.details.toString(),
		data.startDate.toString(),
		data.endDate.toString()
	);

	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newMilestone = initializeMilestoneObject(data);

	const response = postMilestone(newMilestone);

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handlePOSTNewMilestone };
