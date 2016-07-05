Ext.define('Civic.controller.gis.Map', {
    extend: 'Ext.app.Controller',

	views: [
		'gis.Map'
	],

	stores: [
		'engineering.Jobs'
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
				},

				'civicr_map toolbar form combobox': {
					'specialkey': this.onSpecialKeyPress
				}
			}, this
		);
	},

    onMapPanelBeforeRender: function(mapPanel, eOpts) {
        var me = this;

        var layers = [];

    	var base = new OpenLayers.Layer.WMS('OpenStreetMap',
            'http://127.0.0.1/geoserver/gwc/service/wms?',
            {
            	layers: 'osm:osm',
            	format: 'image/png',
            	isBaseLayer: true
            },{
                attribution: '&copy; GeoIntel (Pvt) Ltd <br>' +
                    'Data &copy; OpenStreetMap ' +
                    '<a href="http://www.openstreetmap.org/copyright/en"' +
                    'target="_blank">contributors<a>'
            }
        );
    /*    
        var suburb = new OpenLayers.Layer.Vector('Bulawayo Suburbs', {
            styleMap: Civic.util.Util.suburbStyle,
        	protocol: new OpenLayers.Protocol.HTTP({
                url: "http://127.0.0.1/civicreporter/php/gis/list.php",
                params: {
                	start: 0,
                	limit: 500,
                	entity: 'gis.suburb_all'
                },
                format: new OpenLayers.Format.GeoJSON()
            }),
            strategies: [
            	new OpenLayers.Strategy.Fixed()
            ]
        });
	*/
		var vecLayer = new OpenLayers.Layer.Vector('5 May 2016', {
			preFeatureInsert: function(feature) {
	            feature.geometry.transform(new OpenLayers.Projection("EPSG:32735"), new OpenLayers.Projection("EPSG:900913"))
	       }
        /*    styleMap: new OpenLayers.StyleMap({
                'default': new OpenLayers.Style(
                	Reg.util.Util.def_template, {
                		context: Reg.util.Util.context
                	}
                ),
                'select': new OpenLayers.Style(
                	Reg.util.Util.sel_template, {
                		context: Reg.util.Util.context
                	}
                )
            }),
        	protocol: new OpenLayers.Protocol.HTTP({
                url: 'php/engineering/jobs/list.php',
                format: new OpenLayers.Format.GeoJSON()
            }),
           strategies: [
            	new OpenLayers.Strategy.Fixed()
            ]
     */    });

        layers.push(base);//, vecLayer);

        //me.getEngineeringJobsStore().bind(vecLayer);

        mapPanel.map.addLayers(layers);
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
		    'olDragPan': "url('http://127.0.0.1/civicreporter/resources/images/app/pan.cur'), default",
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
	},

	onSpecialKeyPress: function (combo, e, eOpts) {
		var me = this;
		if (e.getKey()== e.ENTER) {

			Ext.getBody().mask('Searching...Please Wait...', 'loading');

			combo.up('form').getForm().submit({
				url: 'php/gis/search.php',
				success: function (form, action) {
					Ext.getBody().unmask();

					var result = action.result;

					if (result.success) {
						map = me.getMapPanel().map;
						map.zoomToExtent(result.data);
					} else {
						Civic.util.Util.showErrorMsg(result.msg);
					};
				},
				failure: function (form, action) {
					Ext.getBody().unmask();

					switch (action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Failure', 'Invalid values submitted!');
							break;

						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Failure', 'Ajax communication failed.');
							break;

						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert('Failure', action.result.msg);
							break;
					}
				}
			})
		};
	}
});
