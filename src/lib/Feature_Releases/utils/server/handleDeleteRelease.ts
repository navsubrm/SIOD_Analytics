//import { ObjectId } from 'mongodb';
import type { ReleaseForm } from '../../types';
//import { initializeReleaseObject } from '../initializeReleaseObject';
//import { validateReleaseInputs } from '../validateReleaseInputs';
import { deleteRelease } from './deleteRelease';

async function handleDeleteRelease(data: ReleaseForm) {
	const response = deleteRelease(data.id as string, data.stageId);

	if (!response) return { success: false, dbFail: true };

	return { success: true };
}

export { handleDeleteRelease };
