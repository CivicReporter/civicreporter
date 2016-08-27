Ext.define('Civic.view.civicr.StationSummaryGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.stationsummary',

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
	columns:[
		{
			text: 'Station ID',
			width: 100,
			sortable: false,
			dataIndex: 'station_id'
		},{
			text: 'Station Name',
			flex: 1,
			sortable: false,
			dataIndex: 'name'
		},{
			text: 'OPEN',
			width: 70,
			dataIndex: 'open_calls',
			sortable: true
		},{
			text: 'PENDING',
			width: 70,
			dataIndex: 'pending_calls',
			sortable: true
		},{
			text: 'COMPLETED',
			width: 70,
			dataIndex: 'closed_calls',
			sortable: true
		},{
			text: 'TOTAL',
			width: 70,
			dataIndex: 'total_calls',
			sortable: true
		}
	] 
});