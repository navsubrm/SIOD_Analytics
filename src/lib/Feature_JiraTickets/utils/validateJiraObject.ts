import { validateString } from '$lib/utils/validateString';
import { validateDate } from '$lib/utils/validateDate';
import { isJSON } from '$lib/utils/isJSON';
import type { JIRATicketValidations } from '../types';

function validateJiraObject(
	name: string,
	details: string,
	startDate: string,
	plannedReleaseDate: string,
	priority: string,
	milestones: string,
	OPR: string
) {
	const validations: JIRATicketValidations = {};

	if (validateString(name)) validations.missingName = true;
	if (validateString(details)) validations.missingDetails = true;
	if (validateDate(startDate)) validations.invalidStartDate = true;
	if (validateDate(plannedReleaseDate)) validations.invalidPlannedReleaseDate = true;
	if (!priority || isNaN(Number(priority))) validations.invalidPriority = true;
	if (!isJSON(milestones)) validations.invalidMilestones = true;
	if (validateString(OPR)) validations.invalidOPR = true;

	return validations;
}

export { validateJiraObject };
