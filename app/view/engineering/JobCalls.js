Ext.define('Civic.view.engineering.JobCalls', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.engjobcalls',

	requires: [
		'Civic.view.toolbar.SearchAddDelete',
		'Ext.grid.plugin.RowExpander',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
	autoScroll: true,

	plugins: [
		{
			ptype: 'rowexpander',
			rowBodyTpl: [
				'<table>'+
					'<tr><th align = "left">Stand Number:</th><td>{stand_no}</td></tr>'+
					'<tr><th align = "left">Street:</th><td>{street}</td></tr>'+
					'<tr><th align = "left">Suburb:</th><td>{suburb}</td></tr>'+
					'<tr><th align = "left">Description:</th><td>{description}</td></tr>'+
				'</table>'
			]
		}
	],

	features: [
		{
			ftype: 'filters',
			local: true
		}
	],

	columns: [
		{
			text: 'Call Id',
			width: 60,
			dataIndex: 'call_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Fault Code',
			width: 70,
			dataIndex: 'code',
			filter: {
				type: 'string'
			}
		},{
			text: 'Caller Name',
			flex: 1,
			dataIndex: 'caller',
			filter: {
				type: 'string'
			}
		},{
			xtype: 'datecolumn',
			text: 'Time Reported',
			width: 120,
			dataIndex: 'reported_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
		}
	],

	dockedItems: [
		{
			xtype: 'searchadddelete'
		}
	]
});