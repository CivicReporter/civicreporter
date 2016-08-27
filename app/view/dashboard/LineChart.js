Ext.define( 'Civic.view.dashboard.LineChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.linechart',
	
	cls: 'x-panel-body-default',
	style: 'background:#fff',
	animate: true,
	shadow: true,
	theme: 'Category2',
	legend: {
		position: 'right'
	},
	axes: [{
		type: 'Numeric',
		minimum: 0,
		position: 'left',
		fields: ['calls'],
		title: 'Jobs',
		grid: {
			odd: {
				opacity: 1,
				fill: '#ddd',
				stroke: '#bbb',
				'stroke-width': 0.5
			}
		}
	}, {
		type: 'Category',
		position: 'bottom',
		fields: ['name']
	}],
	series: [{
		type: 'line',
		highlight: {
			size: 7,
			radius: 7
		},
		axis: 'left',
		xField: 'name',
		yField: 'calls',
		markerConfig: {
			type: 'circle',
			size: 4,
			radius: 4,
			'stroke-width': 0
		}
	
	}]
});