import { ObjectId } from 'mongodb';
import type { ReleaseForm, ReleaseStage } from '$lib/Feature_Releases/types';

function initializeFeatureReleaseObject(inputs: ReleaseForm) {
	const newRelease: ReleaseStage = {
		_id: new ObjectId().toString(),
		stage: `Day ${inputs.stage}`,
		date: new Date(inputs?.date?.toString() as string),
		createdAt: new Date()
	};

	return newRelease;
}

export { initializeFeatureReleaseObject };
