Ext.define('Civic.store.staticData.Callers', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Caller',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Caller',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Caller'
		}
	}
});