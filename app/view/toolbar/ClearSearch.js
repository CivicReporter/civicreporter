Ext.define('Civic.view.toolbar.ClearSearch', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.clearsearch',

	flex: 1,
	dock: 'bottom',
	ui: 'footer',
	layout: {
		pack: 'end',
		type: 'hbox'
	},
	items: [
		{
			xtype: 'button',
			text: 'Clear',
			itemId: 'clear',
			iconCls: 'clear',
			tooltip: 'Clear values',
			disabled: true			
		},{
			xtype: 'button',
			text: 'Search',
			itemId: 'search',
			iconCls: 'search',
			tooltip: 'Search',
			disabled: true				
		}
	]
});