import * as TrackingItemModel from '$lib/dbFiles/TrackingItemModel';
import * as TrackingEventModel from '$lib/dbFiles/TrackingEventModel';

export async function load() {
	return {
		trackingItems: await TrackingItemModel.fetchTrackingItems(),
		nextEventData: await TrackingEventModel.fetchTrackingEvents()
	};
}
