Ext.define('Civic.view.civicr.AbstractRoster', {
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias: 'widget.abstractroster',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.ux.grid.FiltersFeature',
		'Civic.store.engineering.StaffStatus',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},

	store: 'staticData.Staff',
	plugins: [
		{
			ptype: 'rowediting',
			clicksToEdit: 1, 
			clicksToMoveEditor: 1, 
			autoCancel: false
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
			text: 'Staff Id',
			width: 80,
			dataIndex: 'staff_id',
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'First Name',
			dataIndex: 'firstname',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Last Name',
			flex: 1,
			dataIndex: 'surname',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Call Sign',
			width: 80,
			dataIndex: 'call_sign',
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Phone',
			dataIndex: 'phone',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Status',
			dataIndex: 'status',
			width: 90,
			editor: {
				xtype: 'combobox',
				store: 'engineering.StaffStatus',
				displayField: 'text',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		}
	],

	dockedItems: [
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
					iconCls: 'clear_filter'
				}
			]
		}
	]
});