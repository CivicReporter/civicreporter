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
            items = [],
            group = [];

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

        var buttonGroup = Ext.create('Ext.container.ButtonGroup', {
        	columns: 6,
            defaults: {
                scale: 'small'
            },
            items: [
				{
					xtype:'splitbutton',
					text: 'View',
					itemId: 'view',
					iconCls: 'view',
					menu: [
						{
							text: 'Attribute Table',
							itemId: 'list_attribute'
						},{
							text: 'Map Legend',
							itemId: 'legend'
						}
					]
				},{
					xtype:'splitbutton',
					text: 'Search',
					iconCls: 'search',
					menu: [
						{
							text: 'By Attributes',
							itemId: 'search_attribute'
						},{
							text: 'By Location',
							itemId: 'search_location'
						}
					]
				},{
					xtype:'splitbutton',
					text: 'Export',
					iconCls: 'export',
					menu: [
						{
							text: 'To Image',
							itemId: 'toimage'
						},{
							text: 'To PDF',
							itemId: 'topdf'
						}
					]
				}
			]
        });
        
        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Back",
            control: nav.previous,
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "previous",
            iconCls: 'previous'
        })));
        
        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Next",
            control: nav.next,
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "forward",
            iconCls: 'next'
        })));
        
        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Down",
            control: zoomin,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "zoom in",
            iconCls: 'zoom_in'
        })));
        
        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Up",
            control: zoomout,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "zoom out",
            iconCls: 'zoom_out'
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            text: "Full",
            enableToggle: false,
            iconCls: 'zoom_extent',
            tooltip: "zoom to max extent"
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Pan",
            control: pan,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "pan",
            iconCls: 'pan'
        })));

        /*items.push({
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
		*/
		var buttonGroup2 = Ext.create('Ext.container.ButtonGroup', {
        	columns: 7,
            defaults: {
                scale: 'small'
            },
            items: group
        });

        items.push(buttonGroup2);
        items.push(buttonGroup);

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
