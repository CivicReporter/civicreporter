Ext.define('Civic.util.Util', {
	
	requires: [
		'Ext.util.*'
	],
	statics: {

		required: '<span style="color:red; font-weight:bold" data-qtip = "Required">*</span>',

		decodeJSON: function (text) {
			var result = Ext.JSON.decode(text, true);
			if (!result) {
				result = {};
				result.success = false;
				result.msg = text;
			};
			return result;
		},
		
		showErrorMsg: function (text) {
			Ext.Msg.show({
				title: 'Error!',
				msg: text,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		},

		renderText: function(val, metaD, rec) {				
            switch (rec.get('status')) {
                case 'OPEN': 
                	metaD.style = "color: red;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'PENDING':
                	metaD.style = "color: blue;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'AVAILABLE':
                	metaD.style = "color: green;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'BUSY':
                	metaD.style = "color: blue;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'OFF DUTY':
                	metaD.style = "color: red;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'STANDBY':
                	metaD.style = "color: green;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	default:
                	metaD.style = "color: green;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            }
        },

		renderActive: function (val, metaD, rec) {
			switch (rec.get('active')) {
            	case 't':
                	metaD.style = "color: green;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	case 'f':
                	metaD.style = "color: red;";// font-weight: bold;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
            	default:
                	metaD.style = "color: black;";
                	return Ext.isDate(val) ? Ext.util.Format.date(val, 'd M Y H:i:s'): val;
                	break;
			}
		},

		suburbStyle: new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
			    strokeColor: 'black',
				strokeOpacity: 0.6,
				strokeWidth: 1.5,
				fillColor: 'brown',
				fillOpacity: 0.4,
				label: '${suburb}',
				fontFamily: 'Verdana',
				fontSize: 8,
				fontWeight: 'bold'
			}),
			'select': new OpenLayers.Style({
			    strokeColor: 'black',
				strokeOpacity: 0.7,
				strokeWidth: 2,
				fillColor: 'blue',
				fillOpacity: 0.7
			})
		})
	}
});