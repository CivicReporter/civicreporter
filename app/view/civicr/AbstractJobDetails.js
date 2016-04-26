Ext.define('Civic.view.civcr.AbstractJobDetails', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.abstractjobdetails',

	requires: [
		'Civic.view.toolbar.SearchAddDelete',
		'Ext.grid.plugin.RowExpander',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
	autoScroll: true,
	
	features: [
		{
			ftype: 'filters',
			local: true
		}
	],

	dockedItems: [
		{
			xtype: 'searchadddelete'
		}
	]
});