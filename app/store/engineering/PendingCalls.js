Ext.define('Civic.store.engineering.PendingCalls', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.engineering.Call',
		'Civic.proxy.CVR'
	],

	model: 'Civic.model.engineering.Call',

	//pageSize: 5,
	storeId: 'pendingcalls',

	proxy: {
		type: 'cvr',
		url: 'php/engineering/calls/list.php',
		extraParams: {
			status: 'pending'
		}
	}
});