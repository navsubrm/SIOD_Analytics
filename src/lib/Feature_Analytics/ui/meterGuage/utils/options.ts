export default {
	theme: 'g90',
	title: 'Meter Chart',
	toolbar: { enabled: false },
	percentageIndicator: { enabled: false },
	meter: {
		peak: 0,
		proportional: {
			unit: 'Days',
			total: 90,
			breakdownFormatter: (x) => {
				console.log(x);
				return `${x.datasetsTotal} ${x.datasetsTotal < 0 ? 'Ahead' : 'Behind'}`;
			},
			totalFormatter: (total) => `Ave. Delta`
		},
		status: {
			ranges: [
				{
					range: [-60, 20],
					status: 'success'
				},
				{
					range: [20, 40],
					status: 'warning'
				},
				{
					range: [40, 90],
					status: 'danger'
				}
			]
		}
	},
	color: {
		scale: {
			'Dataset 1': '#925699'
		}
	},
	height: '120px',
	width: '400px'
};
