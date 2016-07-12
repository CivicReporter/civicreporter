Ext.define('Civic.store.security.Users', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.security.User'
	],

	model:'Civic.model.security.User',

	proxy: {
		type: 'ajax',
		reader: {
			type: 'json',
			messageProperty: 'msg',
			root: 'data'
		},
		writer: {
			type: 'json',
			writeAllFields: true,
			encode: true,
			allowSingle: false,
			root: 'data'
		},

		actionMethods: {
			create: 'POST',
			read: 'POST',
			update: 'POST',
			destroy: 'POST'
		},

		api: {
			create: 'php/security/users/create.php',
			read: 'php/security/users/list.php',
			update: 'php/security/users/update.php',
			destroy: 'php/security/users/delete.php'
		},

		listeners: {
			exception: function (proxy, response, operation) {
				Ext.MessageBox.show({
					title: 'REMOTE EXCEPTION',
					msg: operation.getError(),
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				})
			}
		}
	},
	autoSync: true
});