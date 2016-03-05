Ext.define('Civic.view.civicr.SearchWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.searchwindow',

	requires: [
		'Civic.view.toolbar.CancelClearAdd'
	],

	height: 300,
	width: 550,
	autoScroll: true,
	modal: true,

	layout: {
		type: 'fit'
	},

	dockedItems: [
		{
			xtype: 'cancelclearadd'
		}
	]
});