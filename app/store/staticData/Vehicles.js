Ext.define('Civic.store.staticData.Vehicles', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Vehicle',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Vehicle',

	sorters: [
		{
			direction: 'ASC',
			property: 'vehicle_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.vehicle',
			pkey: 'vehicle_id'
		}
	}
});