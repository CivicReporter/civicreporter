Ext.define('Civic.Application', {
    name: 'Civic',

    extend: 'Ext.app.Application',
    
    requires: [
        'Ext.form.Panel',
        'Civic.util.Util'
    ],

    views: [
        'login.Login',
        'Viewport'
    ],

    controllers: [
        'Main',
		'login.Login',
        'menu.Menu',
        'security.Users',
        'staticData.AbstractController',
        'engineering.Calls',
        'engineering.Jobs',
        'engineering.DutyRoster',
        'gis.Map'
    ],

    stores: [
        'menu.Menu',
        'security.Groups',
        'staticData.ActiveStatus',
        'staticData.Callers',
        'staticData.Catchments',
		'staticData.EmergencyCodes',
		'staticData.FaultCodes',
		'staticData.Fire',
		'staticData.FireCodes',
		'staticData.Sections',
		'staticData.Sewer',
		'staticData.Staff',
		'staticData.Stations',
		'staticData.Suburbs',
		'staticData.Roads',
		'staticData.Vehicles',
		'staticData.Water'
    ],

    errText: '<p>CivicReporter did not start correctly.</p>'+'<p>Please reload your browser.</p>',

    launch: function () {

        var me = this,
        	s = [],
        	c = Civic.util.Util;

        var task = new Ext.util.DelayedTask(function(){
            me.splashscreen.fadeOut({
                duration: 1000,
                remove: true
            });
            me.splashscreen.next().fadeOut({
                duration: 1000,
                remove: true,
                listeners:{
                    afteranimate: function(el, startTime, eOpts){
                        Ext.widget('login');
                    }
                }
            });
            
        });

        task.delay(2000);

        Ext.tip.QuickTipManager.init();
        
        // a custom type for our login password field
        Ext.apply(Ext.form.field.VTypes,{
            customPass: function(val, field){
                return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20})/.test(val);
            },
            customPassText: 'Password must be between 6 and 20 characters long and must contain one number, one letter lowercase, one letter uppercase and one special character.'
        });

        Proj4js.defs['EPSG:32735'] = '+proj=utm +zone=35 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs';

        Ext.each(c.staticDataStores, function (staticDataStore) {
        	s.push(staticDataStore.entity);
        });

        Ext.Ajax.request({
        	url: 'php/staticData/list_statics.php',
        	params: {
        		stores: Ext.JSON.encode(s)
        	},
        	scope: me,
        	success: me.onSuccess,
        	failure: me.onFailure
        });
    },
    
    init: function(){
        var me = this;
        me.splashscreen = Ext.getBody().mask(
            'Loading Application', 'splashscreen'
        );
        
    },

    onSuccess: function (response) {
    	var me = this,
    		o = {},
    		c = Civic.util.Util;

    	try {
    		o = Ext.decode(response.responseText);
    	} catch (e) {    		
    		Civic.util.Util.showErrorMsg(e.message);
    		return;
    	}

    	if (true!==o.success) {
    		Civic.util.Util.showErrorMsg(me.errText);
    		return;
    	};

    	c.stores = o.stores;
    	me.loadStaticDataStores();
    },

    onFailure: function (response) {
    	Civic.util.Util.showErrorMsg(this.errText);
    },

    loadStaticDataStores: function () {
    	var c = Civic.util.Util;

    	Ext.each(c.staticDataStores, function (staticDataStore) {
    		var store = Ext.getStore(staticDataStore.storeId),
    			data = c.stores[staticDataStore.entity];

    		if (store && data) {
    			store.loadData(data);
    		};
    	});
    }
});
