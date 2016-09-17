Ext.define('Civic.store.staticData.Sewer', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Catchment',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Catchment',

	sorters: [
		{
			direction: 'ASC',
			property: 'catch_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'gis.sewer_catchment',
			pkey: 'catch_id'
		}
	}
});