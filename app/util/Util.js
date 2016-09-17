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

		context: {
            getColor: function(feature) {
            	switch (feature.attributes.status) {
            		case 'OPEN':
                    	return 'red';
                    	break;
                    case 'PENDING':
                		return 'blue';
                		break;
                	default:
                    	return 'green';
                    	break;
                }
            }
        },

		suburbStyle: new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
			    strokeColor: 'black',
				strokeOpacity: 0.6,
				strokeWidth: 1.5,
				fillColor: 'brown',
				fillOpacity: 0.2,
				label: '${PROVNAMEFU}',
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
		}),

		def_template: {
            cursor: 'pointer',
            fillOpacity: 0.5,
            fillColor: '${getColor}',
            pointRadius: 5,
            strokeWidth: 1.5,
            strokeOpacity: 0.7,
            strokeColor: 'black',
            graphicName: 'circle'
        },

        sel_template: {
        	strokeColor: 'blue',
			strokeOpacity: 0.7,
			strokeWidth: 2,
			pointRadius: 7,
			fillOpacity: 0.7
        },

        staticDataStores: [
        	{
        		storeId: 'security.Groups',
				entity: 'security.groups'
        	},{
        		storeId: 'staticData.Callers',
				entity: 'staticdata.caller'
        	},{
        		storeId: 'staticData.EmergencyCodes',
				entity: 'staticdata.emergency_codes'
        	},{
        		storeId: 'staticData.FaultCodes',
				entity: 'staticdata.fault_codes'
        	},{
        		storeId: 'staticData.Fire',
				entity: 'gis.fire_catchment'
        	},{
        		storeId: 'staticData.FireCodes',
				entity: 'staticdata.fire_codes'
        	},{
        		storeId: 'staticData.Sections',
				entity: 'staticdata.section'
        	},{
        		storeId: 'staticData.Sewer',
				entity: 'gis.sewer_catchment'
        	},{
        		storeId: 'staticData.Staff',
				entity: 'staticdata.staff'
        	},{
        		storeId: 'staticData.Stations',
				entity: 'gis.station'
        	},{
        		storeId: 'staticData.Suburbs',
				entity: 'gis.suburb'
        	},{
        		storeId: 'staticData.Roads',
				entity: 'suburb_road'
        	},{
        		storeId: 'staticData.Vehicles',
				entity: 'staticdata.vehicle'
        	},{
        		storeId: 'staticData.Water',
				entity: 'gis.water_catchment'
        	}
        ],

        stores: {}
	}
});