Ext.define('Civic.view.staticData.Properties', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.propertiesgrid',

	store: 'staticData.Properties',
	columns:[
		{
			text: 'Property Id',
			width: 100,
			dataIndex: 'property_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Suburb Id',
			width: 100,
			dataIndex: 'suburb_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Stand Number',
			width: 100,
			dataIndex: 'stand_no',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Street',
			flex: 1,
			dataIndex: 'street',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Owner',
			dataIndex: 'owner',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Value',
			dataIndex: 'value',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'float'
			}
		}
	]
});