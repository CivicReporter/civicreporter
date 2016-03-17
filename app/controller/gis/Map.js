Ext.define('Civic.controller.gis.Map', {
    extend: 'Ext.app.Controller',

	views: [
		'gis.Map'
	],

    refs: [
		{
			ref: 'mapPanel', 
			selector: 'civicr_map'
		}
    ],    

    init: function() {
        var me = this;

/*        me.getSummitsStore().on({
            scope: me,
            load : me.onSummitsStoreLoad
        });

*/        
		this.control(
			{
				'civicr_map': {
					'beforerender': this.onMapPanelBeforeRender
				}
			}, this
		);
	},

    onMapPanelBeforeRender: function(mapPanel, eOpts) {
        var me = this;

        var layers = [];

        var road = new OpenLayers.Layer.WMS(
            "Bulawayo Roads",
            "http://127.0.0.1/geoserver/wms?",
            {
            	layers: 'geointel:road_all',
            	format: 'image/png',
            	transparent: false
            },{
            	isBaseLayer: true
            }/*,
            {
                attribution: '&copy; terrestris GmbH & Co. KG <br>' +
                    'Data &copy; OpenStreetMap ' +
                    '<a href="http://www.openstreetmap.org/copyright/en"' +
                    'target="_blank">contributors<a>'
            }*/
        );

        var property1 = new OpenLayers.Layer.WMS(
            "Riffle Range",
            "http://127.0.0.1:8080/geoserver/wms?",
            {
            	layers: 'geointel:property_rifflerange',
            	format: 'image/png',
            	transparent: true
            },{
            	isBaseLayer: false
            }
        );
	
		var property = new OpenLayers.Layer.Vector('Riffle Range', {
            strategies: [
            	new OpenLayers.Strategy.BBOX()
            ],
            protocol: new OpenLayers.Protocol.WFS({
                url: 'http://127.0.0.1/geoserver/wfs',
                featureType: 'property_rifflerange',
                featureNS: 'http://www.geointel.biz',
                srsName: 'EPSG: 32735',
                geometryName: 'geom'
            })
        });

        layers.push(road, /*property1,*/ property);

    /*    // create vector layer
        var context = {
            getColor: function(feature) {
                if (feature.attributes.elevation < 2000) {
                    return 'green';
                }
                if (feature.attributes.elevation < 2300) {
                    return 'orange';
                }
                return 'red';
            }
        };
        var template = {
            cursor: "pointer",
            fillOpacity: 0.5,
            fillColor: "${getColor}",
            pointRadius: 5,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "${getColor}",
            graphicName: "triangle"
        };
        var style = new OpenLayers.Style(template, {context: context});
        var vecLayer = new OpenLayers.Layer.Vector("vector", {
            styleMap: new OpenLayers.StyleMap({
                'default': style
            }),
            protocol: new OpenLayers.Protocol.HTTP({
                url: "../../data/summits.json",
                format: new OpenLayers.Format.GeoJSON()
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]
        });
        layers.push(vecLayer);

        // manually bind store to layer
        me.getSummitsStore().bind(vecLayer);

    */    mapPanel.map.addLayers(layers);
    	me.setMousePointerSwitcher();
    	//mapPanel.map.zoomToExtent(mapPanel.map.layers[0].getExtent());

        // some more controls
    /*    mapPanel.map.addControls([new OpenLayers.Control.DragFeature(vecLayer, {
            autoActivate: true,
            onComplete: function(feature, px) {
                var store = me.getSummitsStore();
                store.fireEvent('update', store, store.getByFeature(feature));
            }
        })]);

        // for dev purpose
    */    map = mapPanel.map;
        mapPanel = mapPanel;
    },

    onLaunch: function() {
        var me = this;

        // for dev purpose
        ctrl = this;
/*    },

    onSummitsStoreLoad: function(store, records) {
        // do custom stuff on summits load if you want, for example here we
        // zoom to summits extent
        var dataExtent = store.layer.getDataExtent();
        if (dataExtent) {
            store.layer.map.zoomToExtent(dataExtent);
        }
*/    },

	setMousePointerSwitcher: function (argument) {

		var mousePointerStyle = 'default';

		var MOUSE_POINTER_STYLES = {
		    'olDragPan': "url('http://127.0.0.1/civicreporter/resources/images/app/pan-off.cur'), default",
		    'olZoomIn': "url('http://127.0.0.1/civicreporter/resources/images/app/zoom-in.cur'), default",
		    'olZoomOut': "url('http://127.0.0.1/civicreporter/resources/images/app/zoom-out.cur'), default",
		    'none': 'default'
		};

		map = this.getMapPanel().map;

		var panelControls = map.getControlsBy('classname', 'navig');

		for (var i = 0; i < panelControls.length; i = i + 1) {
			var c = panelControls[i];
			c.events.register('activate', c, function() {
				mousePointerStyle = MOUSE_POINTER_STYLES[this.id];
			});
		}

		map.events.register('mouseover', map, function (e) {
			document.getElementsByClassName('olMap')[0].style.cursor = mousePointerStyle;
		});

		map.getControl('olDragPan').activate();
	}
});
