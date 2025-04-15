import type { FeatureValidations } from '../types';
import { validateDate } from '$lib/utils/validateDate';
import { validateString } from '$lib/utils/validateString';
import { isJSON } from '$lib/utils/isJSON';

function validateFeatureInputs(
	name: string,
	details: string,
	startDate: string,
	priority: number,
	plannedReleaseDate: string,
	coreCapability: string,
	milestones: string
	//releaseStages: ReleaseStage[]
) {
	const validations: FeatureValidations = {};

	if (validateString(name)) validations.missingName = true;
	if (validateString(details)) validations.missingDetails = true;
	if (validateDate(startDate)) validations.invalidStartDate = true;
	if (!priority || isNaN(priority)) validations.missingPriority = true;
	if (plannedReleaseDate && validateDate(plannedReleaseDate))
		validations.invalidPlannedReleaseDate = true;
	if (!isJSON(coreCapability)) validations.invalidCoreCapability = true;
	if (milestones !== '') {
		if (!isJSON(milestones)) validations.invalidMilestones = true;
	}

	return validations;
}

export { validateFeatureInputs };
