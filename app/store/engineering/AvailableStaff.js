Ext.define('Civic.store.engineering.AvailableStaff', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.staticData.Staff',
		'Civic.proxy.Staff'
	],

	model: 'Civic.model.staticData.Staff',
	pageSize: 5,
	storeId: 'availablestaff',

	proxy: {
		type: 'staffproxy'
	}
});