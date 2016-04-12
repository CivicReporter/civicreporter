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
				width: 80,
				dataIndex: 'call_id',
				filter: {
					type: 'numeric'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				text: 'Fault Code',
				width: 80,
				dataIndex: 'code',
				filter: {
					type: 'string'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				text: 'Caller Name',
				flex: 1,
				dataIndex: 'caller',
				filter: {
					type: 'string'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				text: 'Stand Number',
				width: 100,
				dataIndex: 'stand_no',
				filter: {
					type: 'numeric'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				text: 'Suburb',
				width: 160,
				dataIndex: 'suburb',
				filter: {
					type: 'string'
				},
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
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
				width: 140,
				dataIndex: 'reported_on',
				format: 'Y-m-d H:i:s',
				filter: true,
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			},{
				xtype: 'datecolumn',
				text: 'Last Update',
				width: 140,
				dataIndex: 'last_update',
				format: 'Y-m-d H:i:s',
				filter: true,
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderText(value, metaData, record);
				}
			}
		]);

		me.callParent(arguments);
	}
});