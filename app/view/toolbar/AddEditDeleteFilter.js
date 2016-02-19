Ext.define('Civic.view.toolbar.AddEditDeleteFilter', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.addeditdeletefilter',

	flex: 1,
	dock: 'top',
	items: [
		{
			xtype: 'button',
			text: 'New',
			itemId: 'add',
			iconCls: 'add',
			tooltip: 'Create new job'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			text: 'Edit',
			itemId: 'edit',
			disabled: true,
			iconCls: 'edit',
			tooltip: 'Edit selected job'
		},{
			xtype: 'button',
			text: 'Close',
			itemId: 'close',
			disabled: true,
			iconCls: 'accept',
			tooltip: 'Set job status to "Closed"'
		},{
			xtype: 'button',
			text: 'Cancel',
			itemId: 'cancel',
			disabled: true,
			iconCls: 'cancel',
			tooltip: 'Set job status to "Cancelled"'
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