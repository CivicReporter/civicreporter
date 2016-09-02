Ext.define('Civic.proxy.GisData', {
	extend: 'GeoExt.data.proxy.Protocol',
	alias: 'proxy.gisdataproxy',

	requires: [
		'GeoExt.data.reader.Feature'
	],

	reader: {
		type: 'feature',
		messageProperty: 'msg',
		root: 'features'
	},

	protocol: new OpenLayers.Protocol.HTTP({
        url: 'php/engineering/jobs/list.php',
        format: new OpenLayers.Format.GeoJSON()
    }),

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