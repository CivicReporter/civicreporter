Ext.define('Civic.view.toolbar.SearchAddDelete', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.searchadddelete',

	flex: 1,
	dock: 'top',
	items: [
		{
			xtype: 'button',
			text: 'Search and Add',
			itemId: 'add',
			iconCls: 'find',
			tooltip: 'Search and add'
		},{
			xtype: 'button',
			text: 'Delete',
			itemId: 'delete',
			disabled: true,
			iconCls: 'delete',
			tooltip: 'Delete selected'
		}
	]
});