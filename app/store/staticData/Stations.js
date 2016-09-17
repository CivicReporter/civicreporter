Ext.define('Civic.store.staticData.Stations', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Station',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Station',

	sorters: [
		{
			direction: 'ASC',
			property: 'station_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'gis.station',
			pkey: 'station_id'
		}
	}
});