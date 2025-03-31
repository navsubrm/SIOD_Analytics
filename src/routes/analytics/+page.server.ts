import * as TrackingItemModel from '$lib/dbFiles/TrackingItemModel';

export async function load() {
	return {
		trackingItems: await TrackingItemModel.fetchTrackingItems()
	};
}
