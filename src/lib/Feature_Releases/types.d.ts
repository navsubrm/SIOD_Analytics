interface ReleaseStage {
	_id?: string;
	stage?: string;
	date: Date | null;
	updatedAt?: Date | null;
}

interface ReleaseStageValidations {
	invalidFeatureId: boolean;
	invalidStageId: boolean;
	missingDate?: boolean;
	dbFail?: boolean;
}

interface ReleaseForm extends FormDataEntryValue {
	id?: string;
	stageId: string;
	date: string | null;
	updatedAt: Date | null;
}

export type { ReleaseStage, ReleaseStageValidations, ReleaseForm };
