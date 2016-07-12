Ext.define('Civic.view.staticData.Vehicles', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.vehiclesgrid',

	store: 'staticData.Vehicles',
	columns:[
		{
			text: 'Vehicle Id',
			width: 100,
			dataIndex: 'vehicle_id',
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
			dataIndex: 'type',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Station',
			dataIndex: 'station_id',
			width: 200,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Stations',
				displayField: 'name',
				valueField: 'station_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var stationsStore = Ext.getStore('staticData.Stations');
				var station = stationsStore.findRecord('station_id', value);

				return value ? station.get('name'): '';
			}
		},{
			text: 'Radio',
			dataIndex: 'radio',
			editor: {
				xtype: 'numberfield',				
				allowBlank: false,
				minVal: 31000
			},
			filter: {
				type: 'numeric'
			}
		}
	]
});