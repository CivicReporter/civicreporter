Ext.define('Civic.store.engineering.AvailableStaff', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.staticData.Staff',
		'Civic.proxy.CVR'
	],

	model: 'Civic.model.staticData.Staff',

	pageSize: 5,
	storeId: 'availablestaff'
});