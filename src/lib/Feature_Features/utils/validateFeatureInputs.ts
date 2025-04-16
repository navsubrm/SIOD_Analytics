import type { FeatureValidations } from '../types';
//import { validateDate } from '$lib/utils/validateDate';
import { validateString } from '$lib/utils/validateString';
import { isJSON } from '$lib/utils/isJSON';

function validateFeatureInputs(name: string, details: string, coreCapability: string) {
	const validations: FeatureValidations = {};

	if (validateString(name)) validations.missingName = true;
	if (validateString(details)) validations.missingDetails = true;
	if (!isJSON(coreCapability)) validations.invalidCoreCapability = true;

	return validations;
}

export { validateFeatureInputs };
