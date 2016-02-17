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
			text: 'Zone',
			dataIndex: 'zone_id',
			width: 200,
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var zonesStore = Ext.getStore('staticData.Zones');
				var zone = zonesStore.findRecord('zone_id', value);

				return zone != null ? zone.get('name'): value;
			}
		}
	]
});