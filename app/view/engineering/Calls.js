Ext.define('Civic.view.engineering.Calls', {
	extend: 'Civic.view.civicr.CallsGrid',
	alias: 'widget.engcallsgrid',

	requires: [
		'Civic.view.toolbar.AddEditDeleteFilter',
		'Civic.util.Util'
	],

	store: 'engineering.Calls',

	columns: [
		{
			text: 'Severity',
			width: 60,
			dataIndex: 'severity',
			sortable: true,
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Property Damage',
			width: 100,
			dataIndex: 'property_damage',
			sortable: true,
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				return value == 't' ? 'Yes' : 'No';
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
			xtype: 'addeditdeletefilter'
		}
	]
});