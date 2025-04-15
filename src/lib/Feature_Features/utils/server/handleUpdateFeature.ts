import { ObjectId } from 'mongodb';
import type { FeatureForm } from '../../types';
import { initializeFeatureObject } from '../initializeFeatureObject';
import { validateFeatureInputs } from '../validateFeatureInputs';
import { updateFeature } from './updateFeature';

async function handleUpdateFeature(data: FeatureForm) {
	const validations = validateFeatureInputs(
		data?.name,
		data?.details as string,
		data?.startDate?.toString() as string,
		Number(data?.priority?.toString()),
		data?.plannedReleaseDate?.toString() as string,
		data?.coreCapability,
		data?.milestones.toString()
	);

	if (!ObjectId.isValid(data.id as string)) return { success: false, dbFail: true };
	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newFeature = initializeFeatureObject(data);

	const response = updateFeature(data.id as string, { ...newFeature });

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handleUpdateFeature };
