Ext.define('Civic.view.engineering.Calls', {
	extend: 'Civic.view.civicr.CallsGrid',
	alias: 'widget.engcallsgrid',

	requires: [
		'Civic.view.toolbar.AddEditCancelFilter',
		'Civic.util.Util'
	],

	store: 'engineering.Calls',

	columns: [
		{
			text: 'Property Damage',
			width: 100,
			dataIndex: 'property_damage',
			sortable: true,
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				return Civic.util.Util.renderText(value+'%', metaData, record);
			}
		}
	],

	dockedItems: [
		{
			dock: 'bottom',
			xtype: 'pagingtoolbar',
			store: 'engineering.Calls',
			displayInfo: true,
			displayMsg: 'Displaying Calls {0} - {1} of {2}'
		},{
			xtype: 'addeditcancelfilter'
		}
	]
});