Ext.define('Civic.store.engineering.ActiveStaff', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.staticData.Staff',
		'Civic.proxy.Staff'
	],

	model: 'Civic.model.staticData.Staff',
	storeId: 'activestaff',
	autoSync: true,

	proxy: {
		type: 'staffproxy'
	}
});