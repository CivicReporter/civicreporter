Ext.define('Civic.store.staticData.Staff', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Staff',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Staff',

	sorters: [
		{
			direction: 'ASC',
			property: 'staff_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.staff',
			pkey: 'staff_id'
		}
	}
});