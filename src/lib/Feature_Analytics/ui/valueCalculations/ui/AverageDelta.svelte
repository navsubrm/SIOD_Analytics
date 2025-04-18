<script lang="ts">
	import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { getPlannedVsCompleteDelta } from '../utils/getPlannedVsCompleteDelta';

	let deltaSum = $state(0);

	$effect(() => {
		deltaSum = getPlannedVsCompleteDelta($activeList);
	});
</script>

{deltaSum} days {deltaSum < 0 ? 'ahead' : 'behind'}
