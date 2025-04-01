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
		projectedEndDates: ProjectedEndDate[];
		finalReasonId?: string;
		closedDate?: Date;
		parentId?: string;
		parentName: string;
		priorityAssignments: TrackingItemPriority[];
		estimates: TrackingItemEstimate[];
		createdAt: Date;
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
		confidencePercentile: number;
		completionPercentile: number;
		trackingEventId?: string;
		trackingEventName?: string;
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

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
