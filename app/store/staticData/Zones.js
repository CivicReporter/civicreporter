Ext.define('Civic.store.staticData.Zones', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Zone',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Zone',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Zone',
			pkey: 'zone_id'
		}
	}
});