Ext.define('Civic.store.staticData.Properties', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Property',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Property',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Property'
		}
	}
});