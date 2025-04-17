export const options = {
	title: 'Completion vs. Timeline',
	toolbar: { enabled: false },
	axes: {
		left: {
			mapsTo: 'value',
			scaleType: 'linear',
			title: 'Target Variance'
			// label: {
			// 	color: 'yellow'
			// }
		},
		bottom: {
			scaleType: 'labels',
			mapsTo: 'key'
		}
		// top: {
		// 	scaleType: 'linear',
		// 	mapsTo: '% of Days',
		// 	correspondingDatasets: ['% of Days']
		// }
		// right: {
		// 	mapsTo: 'delta',
		// 	title: 'Time/Completion Delta',
		// 	scaleType: 'linear',
		// 	correspondingDatasets: ['Time/Comp Delta %']
		// }
	},
	curve: 'curveMonotoneX',
	color: {
		scale: {
			//'stage 1': '#118dff',
			// Completion: '#e66c37',
			'Original % of Time Past': '#ffffff'
		}
	},
	comboChartTypes: [
		// {
		// 	type: 'simple-bar',
		// 	correspondingDatasets: ['% of Total Time']
		// },
		{
			type: 'line',
			correspondingDatasets: ["Cust. Req's", 'Dev Start', 'In Dev', 'Rel to Dev', 'Rel to IL6'],
			options: {
				points: {
					radius: 5
				}
			}
		}
		// {
		// 	type: 'line',
		// 	correspondingDatasets: ['% of Total Time'],
		// 	options: {
		// 		points: {
		// 			radius: 5
		// 		}
		// 	}
		// }
		// {
		// 	type: 'line',
		// 	correspondingDatasets: ['% of Time Past'],
		// 	options: {
		// 		points: {
		// 			radius: 5
		// 		}
		// 	}
		// }
	],
	height: '400px'
};
