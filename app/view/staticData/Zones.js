Ext.define('Civic.view.staticData.Zones', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.zonesgrid',

	store: 'staticData.Zones',
	columns:[
		{
			text: 'Zone Id',
			width: 100,
			dataIndex: 'zone_id',
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
		}
	]
});