Ext.define('Civic.view.gis.Map', {
    extend: 'GeoExt.panel.Map',
    alias : 'widget.civicr_map',

    requires: [
        'Ext.window.MessageBox',
        'GeoExt.Action'
    ],

    border: 'false',
    //title: 'My Map',
    zoom: 4,
    extent: OpenLayers.Bounds.fromArray([583076.3125,7735767.0,748277.25,7816663.0]),

    initComponent: function() {
        var me = this,
            items = [];

        var map = new OpenLayers.Map('',{
        	numZoomLevels:10,
			displayProjection:'EPSG:32735',
			projection:'EPSG:32735',
			units:'m',
			maxExtent: new OpenLayers.Bounds(583076.3125,7735767.0,748277.25,7816663.0), 
        	fallThrough: true
        });

        var nav = new OpenLayers.Control.NavigationHistory();

		var pan = new OpenLayers.Control.DragPan();

		var zoomin = new OpenLayers.Control.ZoomBox({
			//displayClass:'olControlZoomIn' 	
		});

		var zoomout = new OpenLayers.Control.ZoomBox({
	        //displayClass:'olControlZoomOut',
			out : true 	
		});

        map.addControls([nav, pan, zoomin, zoomout]);
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Back",
            control: nav.previous,
            disabled: true,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "previous",
            iconCls: 'previous'
        })));
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Next",
            control: nav.next,
            disabled: true,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "forward",
            iconCls: 'next'
        })));

        items.push("-");
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Down",
            control: zoomin,
            toggleGroup: "draw",
            allowDepress: true,
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
            allowDepress: false,
            iconCls: 'zoom_extent',
            tooltip: "zoom to max extent"
        })));

        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Pan",
            control: pan,
            toggleGroup: "draw",
            allowDepress: true,
            group: "draw",
            tooltip: "pan",
            iconCls: 'pan'
        })));

        Ext.apply(me, {
            map: map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: items,
                style: {
                    border: 0,
                    padding: 0
                }
            }]
        });
                
        me.callParent(arguments);
    }
});
