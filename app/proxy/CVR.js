Ext.define('Civic.proxy.CVR', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.cvr',

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