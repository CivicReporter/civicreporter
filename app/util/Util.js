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
                	return val != null ? '<span style="color:red;font-weight:bold;">' + val + '</span>' : '';
                	break;
            	case 'PENDING':
                	return val != null ? '<span style="color:blue;font-weight:bold;">' + val + '</span>' : '';
                	break;
            	default:
                	return val != null ? '<span style="color:green;font-weight:bold;">' + val + '</span>' : '';
                	break;
            }
        }
	}
});