Ext.define('Civic.store.staticData.Stations', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Station',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Station',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Station',
			pkey: 'station_id'
		}
	},

	autoLoad: true
});