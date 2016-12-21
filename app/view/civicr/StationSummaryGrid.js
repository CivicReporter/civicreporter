Ext.define('Civic.view.civicr.StationSummaryGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.stationsummary',

	requires: [
		'Ext.grid.feature.Summary',
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
			groupHeaderTpl: '{sewer_catch_id} CATCHMENT',
			hideGroupedHeader: true,
			startCollapsed: true,
			enableGroupingMenu: false
		},{
			id: 'grandtotal',
			ftype: 'summary',
			showSummaryRow: true
		}
	],

	columns:[
		{
			text: 'Suburb ID',
			width: 100,
			sortable: false,
			dataIndex: 'suburb_id',
			summaryRenderer: function(value, summaryData, dataIndex) {
				return 'SUB TOTAL';
			}
		},{
			text: 'Suburb Name',
			flex: 1,
			sortable: false,
			dataIndex: 'name',
			summaryType: 'count',
			summaryRenderer: function(value, summaryData, dataIndex) {
				return ((value === 0 || value > 1) ? '(' + value + ' Suburbs)' : '(1 Suburb)');
			}
		},{
			text: 'Currently Open',
			width: 100,
			dataIndex: 'carried',
			sortable: true,
			summaryType: 'sum'
		},{
			text: ' Currently Pending',
			width: 100,
			dataIndex: 'pending',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'Received Today',
			width: 100,
			dataIndex: 'received',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'Closed Today',
			width: 100,
			dataIndex: 'completed',
			sortable: true,
			summaryType: 'sum'
		}
	] 
});