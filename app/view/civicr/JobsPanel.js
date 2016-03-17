Ext.define('Civic.view.civicr.JobsPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.jobspanel',

	requires: [
		'Civic.view.engineering.Jobs',
		'Civic.view.gis.Map'
	],

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'civicr_map',
			flex: 1
		},{
			xtype: 'engjobsgrid',
			title: 'Jobs List',
			iconCls: 'menu_jobs',
			collapsible: true,
			collapseDirection: 'bottom',
			collapsed: true
		}
	]
});