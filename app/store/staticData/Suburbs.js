Ext.define('Civic.store.staticData.Suburbs', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Suburb',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Suburb',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Suburb'
		}
	}
});