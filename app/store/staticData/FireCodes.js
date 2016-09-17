Ext.define('Civic.store.staticData.FireCodes', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.FireCodes',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.FireCodes',

	sorters: [
		{
			direction: 'ASC',
			property: 'code_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.fire_codes',
			pkey: 'code_id'
		}
	}
});