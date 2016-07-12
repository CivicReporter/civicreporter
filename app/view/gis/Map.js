Ext.define('Civic.view.gis.Map', {
    extend: 'GeoExt.panel.Map',
    alias : 'widget.civicr_map',

    requires: [
        'Ext.window.MessageBox',
        'Civic.util.Util',
        'GeoExt.Action'
    ],

    border: 'false',
    zoom: 3,
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
