Ext.define('Civic.store.security.Groups', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.security.Group'
	],

	model: 'Civic.model.security.Group',

	storeId: 'groups',

	proxy: {
		type: 'ajax',
		url: 'php/security/groups.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	},

	autoLoad: true

});