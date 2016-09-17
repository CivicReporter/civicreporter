Ext.define('Civic.store.staticData.EmergencyCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.EmergencyCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.EmergencyCodes',

	sorters: [
		{
			direction: 'ASC',
			property: 'code_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.emergency_codes',
			pkey: 'code_id'
		}
	}
});