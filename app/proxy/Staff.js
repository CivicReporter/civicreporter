Ext.define('Civic.proxy.Staff', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.staffproxy',

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
		create: 'php/engineering/staff/create.php',
		read: 'php/engineering/staff/list.php',
		update: 'php/engineering/staff/update.php',
		destroy: 'php/engineering/staff/delete.php'
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
});