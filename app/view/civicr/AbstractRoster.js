Ext.define('Civic.view.civicr.AbstractRoster', {
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias: 'widget.abstractroster',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},

	plugins: [
		{
			ptype: 'rowediting',
			pluginId: 'rowplugin',
			clicksToEdit: 2, 
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
				},{
					xtype: 'button',
					itemId: 'refresh',
					text: 'Refresh View',
					iconCls: 'refresh_view'
				}
			]
		}
	]
});