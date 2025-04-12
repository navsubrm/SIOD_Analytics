<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import CardGridContainer from './CardGridContainer.svelte';
	import TrackingItemDisplayCard from '$lib/TrackingItem/ui/CardListComponents/TrackingItemDisplayCard.svelte';
	import Completed from '$lib/components/IconComponents/Completed.svelte';
	import FolderOpen from '$lib/components/IconComponents/FolderOpen.svelte';
	import Clipboard from '$lib/components/IconComponents/Clipboard.svelte';

	const actionCardProps = {
		header: { title: 'Tracking Item Actions', Icon: Clipboard, length: 28 },
		addNewButton: { url: '#', Icon: Clipboard },
		categoryFilter: { placeholder: 'Filter By Category' },
		firstFilterButton: {
			Icon: FolderOpen,
			label: 'Ongoing',
			title: 'Ongoing',
			urlFilterString: 'ongoing-tasks'
		},
		secondFilterButton: {
			Icon: Completed,
			label: 'Completed',
			title: 'Completed',
			urlFilterString: 'completed-tasks'
		}
	};

	let { trackingItemList = [] } = $props();

	let list = $state([...filterTrackingItems(trackingItemList)]);

	function filterTrackingItems(trackingItemList: TrackingItem[]) {
		let list = trackingItemList;
		let activeFilter = actionCardProps?.firstFilterButton?.urlFilterString;
		let closedFilter = actionCardProps?.secondFilterButton?.urlFilterString;
		let closed = page?.url?.searchParams.get(closedFilter);
		let activeWarranty = page?.url?.searchParams.get(activeFilter);
		let itemId = page?.url?.searchParams.get('item-id');
		let categoryFilter = page?.url?.searchParams.get('filter-category');

		if (itemId) list = filterByParent(list);
		if (categoryFilter) list = filterByCategory(list, categoryFilter);
		if (closed) list = filterByClosed(list);
		if (activeWarranty) list = filterByActive(list);
		return list;
	}

	function filterByParent(list: TrackingItem[]) {
		let searchId = page?.url?.searchParams.get('item-id');
		return list.filter((el: TrackingItem) => el._id == searchId || el?.parentId == searchId);
	}

	function filterByCategory(list: TrackingItem[], coreCapability: string) {
		return list.filter((el: TrackingItem) => el.coreCapability == coreCapability);
	}

	function filterByClosed(list: TrackingItem[]) {
		return list.filter((el) => el.closedDate);
	}

	function filterByActive(list: TrackingItem[]) {
		return list.filter((el) => !el?.closedDate);
	}

	afterNavigate(() => {
		list = filterTrackingItems(trackingItemList);
	});
</script>

<CardGridContainer data={list} Card={TrackingItemDisplayCard} {actionCardProps} />
