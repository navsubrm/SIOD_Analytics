import type { Milestone, MilestoneForm } from '../types';

function initializeMilestoneObject(inputs: MilestoneForm) {
	const newMilestone: Milestone = {
		name: inputs.name,
		details: inputs.details,
		startDate: new Date(inputs.startDate.toString()),
		createdAt: new Date()
	};

	if (inputs.endDate) newMilestone.endDate = new Date(inputs.endDate.toString());
	if (inputs?.id) newMilestone.updatedAt = new Date();

	return newMilestone;
}

export { initializeMilestoneObject };
