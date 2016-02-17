Ext.define('Civic.store.staticData.FaultCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.FaultCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.FaultCodes',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Fault_Codes'
		}
	}
});