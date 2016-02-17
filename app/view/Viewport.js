Ext.define('Civic.view.Viewport', {
    extend: 'Ext.container.Viewport',

    alias: 'widget.mainviewport',

    requires:[
        'Civic.view.Header',
        'Civic.view.MainPanel',
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'west',
            xtype: 'mainmenu',
            width: 185,
            collapsible: true
        },{
            region: 'center',
            xtype: 'mainpanel'
        },{
            region: 'north',
            xtype: 'appheader'
        },{
            region: 'south',
            xtype: 'container',
            height: 30,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<div id="titleHeader"><center><span style="font-size: 10px;">Powered By <a href="http://www.geointel.biz">GeoIntel</a></span></center></div>'
        }
    ]
});
