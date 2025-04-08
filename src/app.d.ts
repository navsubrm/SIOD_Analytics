// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface TrackingItem {
		_id?: ObjectId;
		name: string;
		details: string;
		initialReasonId: string;
		initialReason: string;
		coreCapability: string;
		startDate: Date;
		projectedEndDates?: ProjectedEndDate[];
		finalReasonId?: string;
		closedDate?: Date;
		parentId?: string;
		parentName?: string;
		priorityAssignments?: TrackingItemPriority[];
		estimates?: TrackingItemEstimate[];
		createdAt?: Date;
		updatedAt?: Date;
	}

	interface ProjectedEndDate {
		_id: string;
		date: Date;
		createdAt: Date;
	}

	interface TrackingItemPriority {
		_id: string;
		priority: number;
		createdAt: Date;
	}

	interface TrackingItemEstimate {
		_id: string;
		completionPercentile: number;
		trackingEventId: string;
		trackingEventName: string;
		estimateDate: Date;
		createdAt: Date;
	}

	interface TrackingEvent {
		_id?: ObjectId;
		name: string;
		startDate: string;
		endDate: string;
		associatedEventId?: string;
		createdAt: Date;
	}

	interface TrackingItemValidations {
		missingName?: boolean;
		missingDetails?: boolean;
		missingReason?: boolean;
		invalidReason?: boolean;
		missingCoreCapability?: boolean;
		invalidStartDate?: boolean;
		missingDate?: boolean;
		invalidDate?: boolean;
		missingPriority?: boolean;
		invalidPriority?: boolean;
		missingCompletionPercentile?: boolean;
		invalidCompletionPercentile?: boolean;
		invalidTrackingEventId?: boolean;
		missingTrackingEvent?: boolean;
		projectedEndDatesArrayError?: boolean;
		priorityAssignmentsArrayError?: boolean;
		estimatesArrayError?: boolean;
		missingEstimateDate?: boolean;
		invalidEstimateDate?: boolean;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
