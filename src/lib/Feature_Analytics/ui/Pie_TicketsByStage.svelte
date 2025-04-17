<script lang="ts">
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import BlankPieChart from './Pie_BlankChart.svelte';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
	import type { ReleaseStage } from '$lib/Feature_Releases/types';

	let title = $state('% by Stage');

	const categories: any = { unk: 0 };
	let totalItems = $activeList?.length;

	$activeList?.forEach((el: JIRATicket) => {
		const completed: ReleaseStage[] = el?.releaseStages?.filter(
			(el) => el?.date !== null
		) as ReleaseStage[];

		if (completed?.length < 1) {
			categories['unk']++;
		} else {
			if (Object.hasOwn(categories, `${completed[completed.length - 1].stage}`)) {
				categories[`${completed[completed.length - 1].stage}`]++;
			} else {
				categories[`${completed[completed.length - 1].stage}`] = 1;
			}
		}
	});

	let data: [{ group: string; value: number }] | [] = $state([]);

	Object.entries(categories).forEach((el) => {
		data = [...data, { group: el[0], value: calcAverage(totalItems, el[1] as number) }];
	});

	function calcAverage(total: number, item: number): number {
		if (item == 0) return 0;
		return (total / item) * 100;
	}
</script>

<BlankPieChart {data} {title} />
