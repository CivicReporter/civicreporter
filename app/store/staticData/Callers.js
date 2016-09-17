Ext.define('Civic.store.staticData.Callers', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Caller',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Caller',

	sorters: [
		{
			direction: 'ASC',
			property: 'caller_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.caller',
			pkey: 'caller_id'
		}
	}
});