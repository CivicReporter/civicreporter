Ext.define('Civic.store.staticData.EmergencyCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.EmergencyCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.EmergencyCodes',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Emergency_Codes',
			pkey: 'code_id'
		}
	}
});