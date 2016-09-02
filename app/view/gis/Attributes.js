Ext.define('Civic.view.gis.Attributes', {
	extend: 'Ext.grid.property.Grid',
    alias : 'widget.civicr_attributes',

    requires: [
    	'Civic.model.public.AbstractJob'
    ],

    columnLines: true,
    nameColumnWidth: 80
});