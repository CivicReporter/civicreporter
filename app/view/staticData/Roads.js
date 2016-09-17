Ext.define('Civic.view.staticData.Roads', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.roadsgrid',

	store: 'staticData.Roads',
	columns:[
		{
			text: 'Road Id',
			width: 100,
			dataIndex: 'gid',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Name',
			flex: 1,
			dataIndex: 'name',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Suburb',
			width: 150,
			dataIndex: 'suburb_id',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		}
	]
});