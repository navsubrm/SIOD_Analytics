import type { ReleaseForm } from '../../types';
import { initializeReleaseObject } from '../initializeReleaseObject';
import { validateReleaseInputs } from '../validateReleaseInputs';
import { updateRelease } from './updateRelease';

async function handleUpdateRelease(data: ReleaseForm) {
	const validations = validateReleaseInputs(
		data?.id as string,
		data?.stageId as string,
		data?.date as string
	);

	if (Object.keys(validations).length > 0) return { success: false, ...validations };

	const newRelease = initializeReleaseObject(data);

	const response = updateRelease(data.id as string, data.stageId, newRelease);

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handleUpdateRelease };
