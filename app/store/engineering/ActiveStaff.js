Ext.define('Civic.store.engineering.ActiveStaff', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.engineering.Staff',
		'Civic.proxy.Staff'
	],

	model: 'Civic.model.engineering.Staff',
	storeId: 'activestaff',
	autoSync: true,

	proxy: {
		type: 'staffproxy'
	}
});