Ext.define('Civic.view.toolbar.CancelClearAdd', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.cancelclearadd',

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
			text: 'Cancel',
			itemId: 'cancel',
			iconCls: 'cancel',
			tooltip: 'Cancel'			
		},{
			xtype: 'button',
			text: 'Clear',
			itemId: 'clear',
			iconCls: 'clear',
			tooltip: 'Clear selection',
			disabled: true			
		},{
			xtype: 'button',
			text: 'Add',
			itemId: 'add',
			iconCls: 'add',
			tooltip: 'Add selected',
			disabled: true				
		}
	]
});