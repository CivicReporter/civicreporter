Ext.define('Civic.view.toolbar.AddEditCancelFilter', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.addeditcancelfilter',

	flex: 1,
	dock: 'top',
	items: [
		{
			xtype: 'button',
			text: 'New',
			itemId: 'add',
			iconCls: 'add',
			tooltip: 'Add new call'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			text: 'Edit',
			itemId: 'edit',
			disabled: true,
			iconCls: 'edit',
			tooltip: 'Edit selected call'
		},{
			xtype: 'button',
			text: 'Cancel',
			itemId: 'cancel',
			disabled: true,
			iconCls: 'cancel',
			tooltip: 'Set call status to "Cancelled"'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			itemId: 'clearFilter',
			text: 'Clear Filters',
			iconCls: 'clear_filter',
			tooltip: 'Clear column filters'
		}
	]
});