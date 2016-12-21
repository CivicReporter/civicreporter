Ext.define( 'Civic.view.dashboard.BarChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.barchart',
	
	cls: 'x-panel-body-default',
	shadow: true,
	animate: true,
	legend: {
		position: 'right'
	},
	axes: [
		{
			type: 'Numeric',
			position: 'bottom',
			fields: [/* 'received',*/ 'completed', 'pending', 'carried'],
			minimum: 0,
			grid: true
		},{
			type: 'Category',
			position: 'left',
			fields: ['name']
		}
	],
	series: [
		{
			type: 'bar',
			axis: 'bottom',
			highlightCfg: {
				fill: '#ff6347'
			},/*
			listeners: {
				itemmouseup: function(item) {
					 var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
					 var series = mainPanel.down('barchart').series.get(0);
					 mainPanel.down('stationsummary').getSelectionModel().select(Ext.Array.indexOf(series.items, item));
				}
			},*/
			xField: 'name',
			yField: [/* 'received',*/ 'completed', 'pending', 'carried']
		}
	]
});