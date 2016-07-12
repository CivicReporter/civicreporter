Ext.define('Civic.view.menu.Accordion', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.mainmenu',

	requires: [
		'Ext.layout.container.Accordion'
	],

	width: 300,
	layout: {
		type: 'accordion'
	},
	collapsible: false,
	hideCollapseTool: false,
	iconCls: 'sitemap',
	title: 'Menu'
});