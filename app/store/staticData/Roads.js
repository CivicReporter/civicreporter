Ext.define('Civic.store.staticData.Roads', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Road',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Road',

	sorters: [
		{
			direction: 'ASC',
			property: 'name'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'suburb_road',
			pkey: 'gid'
		}
	}
});