import type { FeatureValidations } from '../types';
import { validateDate } from '$lib/utils/validateDate';

function validateFeatureReleaseInputs(stage: string, date: string) {
	const validations: FeatureValidations = {};

	if (isNaN(Number(stage))) validations.missingStage = true;
	if (validateDate(date)) validations.invalidDate = true;

	return validations;
}

export { validateFeatureReleaseInputs };
