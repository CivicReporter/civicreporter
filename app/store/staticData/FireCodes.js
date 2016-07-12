Ext.define('Civic.store.staticData.FireCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.FireCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.FireCodes',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Fire_Codes',
			pkey: 'code_id'
		}
	}
});