Ext.define('Civic.Application', {
    name: 'Civic',

    extend: 'Ext.app.Application',
    
    requires: [
        'Ext.form.Panel'
    ],

    views: [
        'login.Login',
        'Viewport'
    ],

    controllers: [
        'login.Login',
        'menu.Menu',
        'security.Users',
        'staticData.AbstractController',
        'engineering.Calls',
        'engineering.Jobs'
    ],

    stores: [
        'menu.Menu',
        'security.Groups'
    ],

    launch: function () {
        Ext.tip.QuickTipManager.init();

        var me = this;
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
        
        // a custom type for our login password field
        Ext.apply(Ext.form.field.VTypes,{
            customPass: function(val, field){
                return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20})/.test(val);
            },
            customPassText: 'Password must be between 6 and 20 characters long and must contain one number, one letter lowercase, one letter uppercase and one special character.'
        });
    },
    
    init: function(){
        var me = this;
        me.splashscreen = Ext.getBody().mask(
            'Loading Application', 'splashscreen'
        );
        
    }
});
