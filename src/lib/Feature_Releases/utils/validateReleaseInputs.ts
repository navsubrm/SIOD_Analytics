import type { ReleaseStageValidations } from '../types';
import { validateDate } from '$lib/utils/validateDate';
import { ObjectId } from 'mongodb';

function validateReleaseInputs(
	featureId: string,
	stageId: string,
	date: string
	// projectedTime: string = '.2'
) {
	const validations: ReleaseStageValidations = {} as ReleaseStageValidations;

	if (!ObjectId.isValid(stageId)) validations.invalidStageId = true;
	if (!ObjectId.isValid(featureId)) validations.invalidFeatureId = true;

	// if (isNaN(Number(projectedTime)) || (Number(projectedTime) < 0 && Number(projectedTime) > 1))
	// 	validations.invalidTimeProjection = true;
	if (validateDate(date)) validations.missingDate = true;

	return validations;
}

export { validateReleaseInputs };
