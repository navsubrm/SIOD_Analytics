import * as TrackingItemModel from '$lib/models/TrackingItemModel';
import * as TrackingEventModel from '$lib/models/TrackingEventModel';

export async function load() {
	return {
		trackingItems: await TrackingItemModel.fetchTrackingItems(),
		nextEventData: await TrackingEventModel.fetchTrackingEvents()
	};
}
