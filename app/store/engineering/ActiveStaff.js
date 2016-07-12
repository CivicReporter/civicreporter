Ext.define('Civic.store.engineering.ActiveStaff', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.engineering.Staff',
		'Civic.proxy.CVR'
	],

	model: 'Civic.model.engineering.Staff',
	storeId: 'activestaff',

	proxy: {
		type: 'cvr',
		url: 'php/engineering/staff/list.php'
	}
});