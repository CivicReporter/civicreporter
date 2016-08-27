Ext.define('Civic.view.civicr.SuburbSummaryGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.suburbsummary',

	requires: [
		'Ext.grid.feature.GroupingSummary'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
		
	features: [
		{
			id: 'group',
			ftype: 'groupingsummary',
			groupHeaderTpl: '{name} CATCHMENT: {rows.length} SUBURB{[values.rows.length > 1 ? "S" : ""]}',
			hideGroupedHeader: true,
			startCollapsed: true,
			enableGroupingMenu: false
		}
	],
	columns:[
		{
			text: 'SUBURB ID',
			width: 100,
			sortable: false,
			dataIndex: 'suburb_id'
		},{
			text: 'SUBURB NAME',
			flex: 1,
			sortable: false,
			dataIndex: 'name',
			summaryType: 'count',
			summaryRenderer: function(value, summaryData, dataIndex) {
				return ((value === 0 || value > 1) ? '(' + value + ' Suburbs)' : '(1 Suburb)');
			}
		},{
			text: 'OPEN',
			width: 70,
			dataIndex: 'open',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'PENDING',
			width: 70,
			dataIndex: 'pending',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'COMPLETED',
			width: 70,
			dataIndex: 'completed',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'TOTAL',
			width: 70,
			dataIndex: 'total',
			sortable: true,
			summaryType: 'sum'
		}
	] 
});