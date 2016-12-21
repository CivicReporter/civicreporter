Ext.define( 'Civic.view.dashboard.GaugeChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.gaugechart',
	
	cls: 'x-panel-body-default',
	insetPadding: 27,	
	//style: 'background:#fff',
	animate: {
		easing: 'elasticIn',
		duration: 500
	},
	
	axes: [{
		type: 'gauge',
		position: 'gauge',
		minimum: 0,
		maximum: 10,
		steps: 10,
		margin: 7
	}]/*,
	
	series: [{
		type: 'gauge',
		//field: 'open',
		donut: 50,
		colorSet: ['#228b22','#ff6347']// investigate 159879-KPI-Gauge on sencha forums about customising colorset ranges
	}]*/
});