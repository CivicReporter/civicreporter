Ext.define('Civic.view.toolbar.BackNextCancelSave', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.backnextcancelsave',

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
			text: 'Back',
			itemId: 'back',
			iconCls: 'back',
			disabled: true			
		},{
			xtype: 'button',
			text: 'Next',
			itemId: 'next',
			iconCls: 'forward'			
		},{
			xtype: 'button',
			text: 'Cancel',
			itemId: 'cancel',
			iconCls: 'cancel'			
		},{
			xtype: 'button',
			text: 'Save',
			itemId: 'save',
			iconCls: 'save',
			formBind: true			
		}
	]
});