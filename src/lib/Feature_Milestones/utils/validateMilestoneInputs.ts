import type { MileStoneValidations } from '../types';
import { validateDate } from '$lib/utils/validateDate';
import { validateString } from '$lib/utils/validateString';

function validateMilestoneInputs(
	name: string,
	details: string,
	startDate: string,
	endDate: string
) {
	const validations: MileStoneValidations = {};

	if (validateString(name)) validations.missingName = true;
	if (validateString(details)) validations.missingDetails = true;
	if (validateDate(startDate)) validations.invalidStartDate = true;
	if (endDate && validateDate(endDate)) validations.invalidEndDate = true;

	return validations;
}

export { validateMilestoneInputs };
