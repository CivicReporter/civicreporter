Ext.define('Civic.view.gis.Map', {
    extend: 'GeoExt.panel.Map',
    alias : 'widget.civicr_map',

    requires: [
        'Ext.window.MessageBox',
        'Civic.util.Util',
        'GeoExt.Action'
    ],

    border: 'false',

    initComponent: function() {
        var me = this,
            items = [];

        var map = new OpenLayers.Map('',{
        	resolutions: [611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,9.554628534317017,4.777314267158508,2.388657133579254],
			restrictedExtent: [3094175.5,-2329335.0,3259975.5,-2241285.75],
			displayProjection:'EPSG:900913',
			projection:'EPSG:900913',
			units:'m',
			maxExtent: [-20037508.34,-20037508.34,20037508.34,20037508.34], 
        	fallThrough: true
        });

        var nav = new OpenLayers.Control.NavigationHistory();

		var pan = new OpenLayers.Control.DragPan({
			id: 'olDragPan',
			classname: 'navig'
		});

		var zoomin = new OpenLayers.Control.ZoomBox({
			id: 'olZoomIn',
			classname: 'navig' 	
		});

		var zoomout = new OpenLayers.Control.ZoomBox({
			id: 'olZoomOut',
	        classname: 'navig',
			out : true 	
		});

        map.addControls([nav, pan, zoomin, zoomout]);
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Back",
            control: nav.previous,
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "previous",
            iconCls: 'previous'
        })));
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Next",
            control: nav.next,
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "forward",
            iconCls: 'next'
        })));

        items.push("-");
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Down",
            control: zoomin,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "zoom in",
            iconCls: 'zoom_in'
        })));
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Up",
            control: zoomout,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "zoom out",
            iconCls: 'zoom_out'
        })));

        items.push("-");

        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            text: "Full",
            enableToggle: false,
            iconCls: 'zoom_extent',
            tooltip: "zoom to max extent"
        })));

        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Pan",
            control: pan,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "pan",
            iconCls: 'pan'
        })));

        items.push(" ");

        items.push({
        	xtype: 'form',
        	layout: 'fit',
        	items: [
        		{
        			xtype: 'combo',
        			name: 'suburb',
		        	width: 150,
		        	emptyText: 'search for a suburb',
		        	hideTrigger: true
        		}
        	]        	
        });

        Ext.apply(me, {
            map: map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: items,
                style: {
                    padding: 5
                }
            }]
        });
                
        me.callParent(arguments);
    }
});
