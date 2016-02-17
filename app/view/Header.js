Ext.define('Civic.view.Header', {
	extend: 'Ext.toolbar.Toolbar',

	alias: 'widget.appheader',

	height: 30,

	ui: 'footer',

	style: 'border-bottom: 4px solid #4c72a4;',
	
	items: [
		{
			xtype: 'label',
			html: '<div id="titleHeader"><span style="font-weight: bold">CivicReporter 1.0</span></div>'
		},{
			xtype: 'tbfill'
		}
	]
});