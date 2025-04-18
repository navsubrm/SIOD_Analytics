export const options = {
	// title: 'Actual Vs. Projection',
	toolbar: { enabled: false },
	theme: 'g90',
	// data: {
	// 	loading: true
	// },
	axes: {
		left: {
			mapsTo: 'value',
			scaleType: 'percentage',
			title: '% of Variance From Projection'
		},
		bottom: {
			scaleType: 'labels',
			mapsTo: 'key'
		}
	},
	curve: 'curveMonotoneX',
	comboChartTypes: [
		{
			type: 'line',
			correspondingDatasets: ["Cust. Req's", 'Dev Start', 'In Dev', 'Rel to Dev', 'Rel to IL6'],
			options: {
				points: {
					radius: 5
				}
			}
		}
	],
	height: '350px'
};
