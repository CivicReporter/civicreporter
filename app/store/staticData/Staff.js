Ext.define('Civic.store.staticData.Staff', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Staff',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Staff',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Staff'
		}
	}
});