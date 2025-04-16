import type { ReleaseForm } from '$lib/Feature_Releases/types';
import { initializeFeatureReleaseObject } from '../initializeFeatureReleaseObject';
import { validateFeatureReleaseInputs } from '../validateFeatureReleaseInputs';
import { postFeatureRelease } from './postFeatureRelease';

async function handlePOSTNewFeatureRelease(data: ReleaseForm) {
	console.log(data);

	const validations = validateFeatureReleaseInputs(
		data?.stage?.toString() as string,
		data?.date?.toString() as string
	);

	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newRelease = initializeFeatureReleaseObject(data);

	const response = postFeatureRelease(data?.id as string, newRelease, 'features');

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handlePOSTNewFeatureRelease };
