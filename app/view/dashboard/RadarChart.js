Ext.define( 'Civic.view.dashboard.RadarChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.radarchart',
	margin: '0 0 0 0',
	cls: 'x-panel-body-default',
	//shadow: true,
	animate: true,
	legend: {
		position: 'right'
	},
	axes: [
		{
			type: 'Radial',
			position: 'radial',
			label: {
				display: true
			}
		}
	],
	series: [
		{
			type: 'radar',
			showInLegend: true,
			style: {
				opacity: 0.4
			},
			xField: 'name',
			yField: ['24 hrs']
		},{
			type: 'radar',
			showInLegend: true,
			style: {
				opacity: 0.4
			},
			xField: 'name',
			yField: ['48 hrs']
		},{
			type: 'radar',
			showInLegend: true,
			style: {
				opacity: 0.4//fill: '#456d9f'
			},
			xField: 'name',
			yField: ['72 hrs']
		},{
			type: 'radar',
			showInLegend: true,
			style: {
				opacity: 0.4//fill: '#456d9f'
			},
			xField: 'name',
			yField: ['beyond']
		}
	]
});