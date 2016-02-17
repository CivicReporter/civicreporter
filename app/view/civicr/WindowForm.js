Ext.define('Civic.view.civicr.WindowForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.windowform',

	requires: [
		'Civic.view.toolbar.CancelSave'
	],
	autoScroll: true,
	layout: {
		type: 'fit'
	},
	modal: true,

	dockedItems: [
		{
			xtype: 'cancelsave'			
		}
	]
});