Ext.define('Civic.proxy.StaticData', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.staticdataproxy',

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
		create: 'php/staticData/create.php',
		read: 'php/staticData/list.php',
		update: 'php/staticData/update.php',
		destroy: 'php/staticData/delete.php'
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