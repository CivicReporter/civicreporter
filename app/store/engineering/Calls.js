Ext.define('Civic.store.engineering.Calls', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.engineering.Call',
		'Civic.proxy.CVR'
	],

	model: 'Civic.model.engineering.Call',

	pageSize: 25,
	storeId: 'calls',

	proxy: {
		type: 'cvr',
		url: 'php/engineering/calls/list.php'
	}
});