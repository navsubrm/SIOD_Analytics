export default {
	title: 'Days for OA Approval at Each Stage',
	axes: {
		left: {
			mapsTo: 'key',
			scaleType: 'labels',
			title: 'Features'
		},
		bottom: {
			mapsTo: 'value',
			stacked: true,
			title: 'Days for Each OA approval'
		}
	},
	height: '400px'
};
