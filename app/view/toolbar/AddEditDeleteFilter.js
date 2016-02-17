Ext.define('Civic.view.toolbar.AddEditDeleteFilter', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.addeditdeletefilter',

	flex: 1,
	dock: 'top',
	items: [
		{
			xtype: 'button',
			text: 'Add',
			itemId: 'add',
			iconCls: 'add'
		},{
			xtype: 'button',
			text: 'Edit',
			itemId: 'edit',
			disabled: true,
			iconCls: 'edit'
		},{
			xtype: 'button',
			text: 'Delete',
			itemId: 'delete',
			disabled: true,
			iconCls: 'delete'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			itemId: 'clearFilter',
			text: 'Clear Filters',
			iconCls: 'clear_filter'
		}
	]
});