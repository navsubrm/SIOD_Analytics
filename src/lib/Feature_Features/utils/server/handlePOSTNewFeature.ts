import type { FeatureForm } from '../../types';
import { initializeFeatureObject } from '../initializeFeatureObject';
import { validateFeatureInputs } from '../validateFeatureInputs';
import { postFeature } from './postFeature';

async function handlePOSTNewFeature(data: FeatureForm) {
	const validations = validateFeatureInputs(
		data?.name,
		data?.details as string,
		// data?.startDate?.toString() as string,
		// Number(data?.priority?.toString()),
		// data?.plannedReleaseDate?.toString() as string,
		data?.coreCapability
		//data?.milestones.toString()
	);

	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newFeature = initializeFeatureObject(data);

	const response = postFeature(newFeature);

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handlePOSTNewFeature };
