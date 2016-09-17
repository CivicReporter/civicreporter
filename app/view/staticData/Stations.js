Ext.define('Civic.view.staticData.Stations', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.stationsgrid',

	store: 'staticData.Stations',
	columns:[
		{
			text: 'Station Id',
			width: 100,
			dataIndex: 'station_id',
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
			text: 'Type',
			width: 150,
			dataIndex: 'type',
			editor: {
				xtype: 'combobox',
				store: 'staticData.Catchments',
				displayField: 'text',
				queryMode: 'local',
				allowBlank: false
			}
		}
	]
});