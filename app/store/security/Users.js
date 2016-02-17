Ext.define('Civic.store.security.Users', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.security.User'
	],

	model:'Civic.model.security.User',

	proxy: {
		type: 'ajax',
		url: 'php/security/users.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});