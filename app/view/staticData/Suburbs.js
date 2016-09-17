Ext.define('Civic.view.staticData.Suburbs', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.suburbsgrid',

	store: 'staticData.Suburbs',
	columns:[
		{
			text: 'Suburb Id',
			width: 100,
			dataIndex: 'suburb_id',
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
			text: 'Fire Catchment',
			dataIndex: 'fire_catch_id',
			width: 200,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Fire',
				displayField: 'name',
				valueField: 'catch_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var fireStore = Ext.getStore('staticData.Fire');
				var zone = fireStore.findRecord('catch_id', value);

				return value ? zone.get('name'): '';
			}
		},{
			text: 'Sewer Catchment',
			dataIndex: 'sewer_catch_id',
			width: 200,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Sewer',
				displayField: 'name',
				valueField: 'catch_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var sewerStore = Ext.getStore('staticData.Sewer');
				var zone = sewerStore.findRecord('catch_id', value);

				return value ? zone.get('name'): '';
			}
		},{
			text: 'Water Catchment',
			dataIndex: 'water_catch_id',
			width: 200,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Water',
				displayField: 'name',
				valueField: 'catch_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var waterStore = Ext.getStore('staticData.Water');
				var zone = waterStore.findRecord('catch_id', value);

				return value ? zone.get('name'): '';
			}
		}
	]
});