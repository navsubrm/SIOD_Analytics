import type { ReleaseStage, ReleaseForm } from '../types';

function initializeReleaseObject(inputs: ReleaseForm) {
	const newRelease: ReleaseStage = {
		date: new Date(inputs.date as string),
		updatedAt: new Date()
	};

	return newRelease;
}

export { initializeReleaseObject };
