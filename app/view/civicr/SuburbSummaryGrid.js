Ext.define('Civic.view.civicr.SuburbSummaryGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.suburbsummary',

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

	bbar: [
		'-',{
			xtype: 'button',
			itemId: 'refresh',
			text: 'Refresh View',
			iconCls: 'refresh_view'
		},'-',{
			xtype: 'button',
			itemId: 'print',
			text: 'Print',
			iconCls: 'print',
			tooltip: 'Print current page'
		},'-',{
			xtype: 'button',
			itemId: 'toPdf',
			text: 'Export to PDF',
			iconCls: 'to_pdf',
			tooltip: 'Generate PDF document'
		},'-',{
			xtype: 'button',
			itemId: 'toExcel',
			text: 'Export to Excel',
			iconCls: 'to_excel',
			tooltip: 'Generate Excel sheet'
		},'-'
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
			text: 'Carried Forward',
			width: 100,
			dataIndex: 'carried',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'Jobs Received',
			width: 100,
			dataIndex: 'received',
			sortable: true,
			summaryType: 'sum',
			renderer: function(value, metaData, record){
				var total = record.get('completed') + record.get('pending');//modify this after adding assigned_on date to engineering.job

				return total;
			}
		},{
			text: 'Jobs Completed',
			width: 100,
			dataIndex: 'completed',
			sortable: true,
			summaryType: 'sum'
		},{
			text: 'Jobs Pending',
			width: 100,
			dataIndex: 'pending',
			sortable: true,
			summaryType: 'sum'
		}
	] 
});