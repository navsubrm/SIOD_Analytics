import { ObjectId } from 'mongodb';
import type { Feature, FeatureForm } from '../types';

function initializeFeatureObject(inputs: FeatureForm) {
	const newFeature: Feature = {
		name: inputs.name,
		details: inputs.details,
		coreCapability: JSON.parse(inputs.coreCapability.toString()).value,
		createdAt: new Date()
	};

	if (!inputs?.id) {
		newFeature.releaseStages = [
			{
				_id: new ObjectId().toString(),
				stage: 'Day 0',
				date: new Date(),
				updatedAt: null
			}
		];
	}

	if (inputs?.id) newFeature.updatedAt = new Date();

	return newFeature;
}

export { initializeFeatureObject };
