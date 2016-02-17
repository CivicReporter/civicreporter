Ext.define('Civic.store.staticData.Vehicles', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Vehicle',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Vehicle',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Vehicle'
		}
	}
});