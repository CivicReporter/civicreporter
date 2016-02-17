Ext.define('Civic.view.civicr.CallsGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.callsgrid',

	requires: [
		'Ext.grid.plugin.RowExpander',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},

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

	initComponent: function () {
		var me = this;

		me.columns = Ext.Array.merge([
			{
				text: 'Call Id',
				width: 100,
				dataIndex: 'call_id',
				filter: {
					type: 'numeric'
				}
			},{
				text: 'Fault Code',
				width: 100,
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
				text: 'Stand Number',
				width: 100,
				dataIndex: 'stand_no',
				filter: {
					type: 'numeric'
				}
			},{
				text: 'Suburb',
				width: 200,
				dataIndex: 'suburb',
				filter: {
					type: 'string'
				}
			}
		],
		me.columns, [
			{
				text: 'Status',
				width: 100,
				dataIndex: 'status',
				filter: {
					type: 'string'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				xtype: 'datecolumn',
				text: 'Time Reported',
				width: 120,
				dataIndex: 'reported_on',
				format: 'Y-m-d H:i:s',
				filter: true,
				renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
			},{
				xtype: 'datecolumn',
				text: 'Last Update',
				width: 120,
				dataIndex: 'last_update',
				format: 'Y-m-d H:i:s',
				filter: true,
				renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
			}
		]);

		me.callParent(arguments);
	}
});