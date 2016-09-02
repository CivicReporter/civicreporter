Ext.define('Civic.view.gis.AbstractGISPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.abstractgispanel',

	requires: [
		'Civic.view.gis.AbstractMap'
	],

	layout: {
		type: 'fit'
	},
	items:[
		{
			xtype: 'abstract_map'
		}	
	]
});