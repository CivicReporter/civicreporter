Ext.define('Civic.store.staticData.Suburbs', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Suburb',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Suburb',

	sorters: [
		{
			direction: 'ASC',
			property: 'suburb_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'gis.suburb',
			pkey: 'suburb_id'
		}
	}
});