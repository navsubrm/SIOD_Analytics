interface Feature {
	_id?: string;
	name: string;
	details?: string;
	coreCapability: string;
	releaseStages: ReleaseStage[];
	createdAt: Date;
	updatedAt?: Date;
}

interface FeatureValidations {
	missingName?: boolean;
	missingDetails?: boolean;
	invalidCoreCapability?: boolean;
	dbFail?: boolean;
	invalidDate?: boolean;
	missingStage?: boolean;
}

interface FeatureRelease {
	_id?: string;
	stage: string;
	date: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface FeatureForm extends FormDataEntryValue {
	id?: string;
	name: string;
	details?: string;
	startDate?: Date;
	priority?: string;
	plannedReleaseDate?: Date;
	coreCapability: string;
	milestone: string;
	releaseStages: ReleaseStage[];
}

export type { Feature, FeatureValidations, FeatureRelease, FeatureForm };
