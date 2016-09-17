Ext.define('Civic.view.civicr.WindowForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.windowform',

	requires: [
		'Civic.view.toolbar.CancelSave',
		'Civic.view.toolbar.BackNextCancelSave'
	],
	autoScroll: false,
	layout: {
		type: 'fit'
	},
	modal: false,//true,
	draggable: false
});