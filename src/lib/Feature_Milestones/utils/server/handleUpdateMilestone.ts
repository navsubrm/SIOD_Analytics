import { ObjectId } from 'mongodb';
import type { MilestoneForm } from '../../types';
import { initializeMilestoneObject } from '../initializeMilestoneObject';
import { validateMilestoneInputs } from '../validateMilestoneInputs';
import { updateMilestone } from './updateMilestone';

async function handleUpdateMilestone(data: MilestoneForm) {
	const validations = validateMilestoneInputs(
		data.name.toString(),
		data.details.toString(),
		data.startDate.toString(),
		data.endDate.toString()
	);

	if (!ObjectId.isValid(data.id as string)) return { success: false, dbFail: true };
	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newMilestone = initializeMilestoneObject(data);

	const response = updateMilestone(data.id as string, { ...newMilestone });

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handleUpdateMilestone };
