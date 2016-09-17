Ext.define('Civic.store.staticData.FaultCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.FaultCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.FaultCodes',

	sorters: [
		{
			direction: 'ASC',
			property: 'code_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.fault_codes',
			pkey: 'code_id'
		}
	}
});