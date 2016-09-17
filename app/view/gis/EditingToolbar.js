Ext.define('Civic.view.gis.EditingToolbar', {
	extend: 'Ext.window.Window',
	alias: 'widget.editingtoolbar',

	title: 'Job Coordinates',
	width: 200,
	modal: false,
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer'
		}
	]
});