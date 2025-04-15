import { ObjectId } from 'mongodb';
import type { Feature, FeatureForm } from '../types';

function initializeFeatureObject(inputs: FeatureForm) {
	const newFeature: Feature = {
		name: inputs.name,
		details: inputs.details,
		startDate: new Date(inputs?.startDate?.toString() as string),
		priority: inputs.priority,
		plannedReleaseDate: new Date(inputs?.plannedReleaseDate?.toString() as string),
		coreCapability: JSON.parse(inputs.coreCapability.toString()).value,
		milestones: [],
		createdAt: new Date()
	};

	if (!inputs?.id) {
		newFeature.releaseStages = [
			{
				_id: new ObjectId().toString(),
				stage: 'In Dev',
				date: new Date(),
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Released to Dev',
				date: null,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Released to IL4',
				date: null,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'Released to IL6',
				date: null,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'User Accepted',
				date: null,
				updatedAt: null
			},
			{
				_id: new ObjectId().toString(),
				stage: 'OA approved',
				date: null,
				updatedAt: null
			}
		];
	}

	if (inputs?.milestones.toString() !== '')
		newFeature.milestones = [...JSON.parse(inputs?.milestones.toString())];
	if (inputs?.id) newFeature.updatedAt = new Date();

	return newFeature;
}

export { initializeFeatureObject };
