Ext.define('Civic.store.engineering.Jobs', {
	//extend: 'Ext.data.Store',
	extend: 'GeoExt.data.FeatureStore',

	requires: [
		'Civic.model.engineering.Job'
	],

	model: 'Civic.model.engineering.Job',

	pageSize: 10,
	storeId: 'jobs',

	proxy: {
		type: 'gisdataproxy'
	}
});