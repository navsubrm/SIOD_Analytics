interface Feature {
	_id?: string;
	name: string;
	details?: string;
	startDate?: Date;
	priority?: string;
	plannedReleaseDate?: Date;
	coreCapability: string;
	associatedJiraTickets: string[];
	releaseStages?: ReleaseStage[];
	createdAt: Date;
	updatedAt?: Date;
}

interface FeatureValidations {
	missingName?: boolean;
	missingDetails?: boolean;
	invalidStartDate?: boolean;
	missingPriority?: boolean;
	invalidPlannedReleaseDate?: boolean;
	invalidCoreCapability?: boolean;
	invalidAssociatedJiraTickets?: boolean;
	dbFail?: boolean;
}

interface FeatureForm extends FormDataEntryValue {
	id?: string;
	name: string;
	details?: string;
	startDate?: Date;
	priority?: string;
	plannedReleaseDate?: Date;
	coreCapability: string;
	associatedJiraTickets: string[];
	releaseStages: ReleaseStage[];
}

export type { Feature, FeatureValidations, FeatureForm };
