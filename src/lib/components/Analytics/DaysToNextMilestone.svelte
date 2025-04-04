<script lang="ts">
	import { getDaysBetweenDates } from '$lib/HelperFunctions/getDaysBetweenDates';

	interface nextDueResult {
		date: Date;
		name: string;
	}

	let { nextEventData } = $props();

	nextEventData.sort(
		(a: TrackingEvent, b: TrackingEvent) => new Date(a.endDate) < new Date(b.endDate)
	);

	let nextDue: nextDueResult | null = $state(getNextEvent());

	function getNextEvent() {
		let date;
		for (let i = 0; i < nextEventData.length; i++) {
			if (new Date(nextEventData[i].endDate) > new Date()) {
				return { date: new Date(nextEventData[i].endDate), name: nextEventData[i].name };
			}
		}
		return null;
	}
</script>

{#if !nextDue}
	"Date Not Found."
{:else}
	<p>{nextDue.name}: {getDaysBetweenDates(nextDue.date as Date, new Date())} Days</p>
{/if}
