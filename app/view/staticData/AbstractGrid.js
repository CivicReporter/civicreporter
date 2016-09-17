Ext.define('Civic.view.staticData.AbstractGrid', {
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias: 'widget.staticdatagrid',

	requires: [
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},

	initComponent: function () {
		var me = this;	

		me.plugins = [
			Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToEdit: 2,
				pluginId: 'rowplugin', 
				clicksToMoveEditor: 1, 
				autoCancel: true
			})
		];

		me.features = [
			Ext.create('Ext.ux.grid.FiltersFeature', {
				local: true
			})
		];

		me.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				itemId: 'topToolbar',
				items: [
					{
						xtype: 'button',
						itemId: 'add',
						text: 'Add',
						iconCls: 'add'
					},{
						xtype: 'tbseparator'
					},{
						xtype: 'button',
						itemId: 'save',
						text: 'Save Changes',
						iconCls: 'save_all'
					},{
						xtype: 'button',
						itemId: 'cancel',
						text: 'Cancel Changes',
						iconCls: 'cancel'
					},{
						xtype: 'tbseparator'
					},{
						xtype: 'button',
						itemId: 'clearFilter',
						text: 'Clear Filters',
						iconCls: 'clear_filter',
						disabled: true
					},{
						xtype: 'button',
						itemId: 'refresh',
						text: 'Refresh View',
						iconCls: 'refresh_view'
					},{
						xtype: 'tbseparator'
					},{
						xtype: 'button',
						itemId: 'print',
						text: 'Print',
						iconCls: 'print',
						tooltip: 'Print current page'
					},{
						xtype: 'button',
						itemId: 'toPdf',
						text: 'Export to PDF',
						iconCls: 'to_pdf',
						tooltip: 'Generate PDF document'
					},{
						xtype: 'button',
						itemId: 'toExcel',
						text: 'Export to Excel',
						iconCls: 'to_excel',
						tooltip: 'Generate Excel sheet'
					}
				]
			}
		];

		me.columns = Ext.Array.merge(me.columns,
			[{
				xtype: 'datecolumn',
				text: 'Last Update',
				width: 140,
				dataIndex: 'last_update',
				format: 'Y-m-d H:i:s',
				filter: true,
				renderer: function (value, metaData, record) {
					 return Civic.util.Util.renderActive(value, metaData, record);
				}

			},{
				xtype: 'actioncolumn',
				width: 30,
				align: 'center',
				sortable: false,
				menuDisabled: true,
				items: [
					{
						handler: function (view, rowIndex, colIndex, item, e) {
							this.fireEvent('itemclick', this, 'delete', view, rowIndex, colIndex, item, e);
						},
						iconCls: 'delete',
						tooltip: 'Delete'
					}
				]
			}]
		);

		me.callParent(arguments);
	}
});

