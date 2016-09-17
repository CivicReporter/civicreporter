Ext.define('Civic.controller.gis.Map', {
    extend: 'Ext.app.Controller',

	views: [
		'gis.Map',
		'gis.AbstractMap',
		'gis.Attributes',
		'gis.AbstractPopup',
		'Civic.util.Util'
	],

	stores: [
		'engineering.Jobs'
	],

    refs: [
		{
			ref: 'mapPanel', 
			selector: 'civicr_map'
		},{
			ref: 'mapPanel2', 
			selector: 'abstract_map'
		}
    ],    

    init: function() {
        var me = this;
      
		this.control(
			{
				'civicr_map': {
					'beforerender': this.onMapPanelBeforeRender
				},

				'civicr_map button#view  menuitem#list_attribute': {
					'click': this.onAttributesShow
				},

				'civicr_map toolbar': {
					'beforerender': this.onToolBarBeforeRender
				},

				'abstract_map': {
					'beforerender': this.onMapPanelBeforeRender2
				}
			}, this
		);

		this.listen({
			store: {
				'#engineering.Jobs': {
					load: this.onJobsStoreLoad
				}
			}
		});
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
                    'target="_blank">contributors<a>',
                eventListeners: {
                	'loadstart': function (evt) {
                		Ext.get(mapPanel.getEl()).mask('Loading...', 'loading');
                	},

                	'loadend': function (evt) {
                		Ext.get(mapPanel.getEl()).unmask();
                	}
                }
            }
        );

		var vecLayer = new OpenLayers.Layer.Vector('priority jobs', {
			
			preFeatureInsert: function(feature) {
				feature.geometry.transform(new OpenLayers.Projection("EPSG:32735"), new OpenLayers.Projection("EPSG:900913"))
			},

			eventListeners: {
				
				'beforefeaturesadded': function (evt) {
					Ext.get(mapPanel.getEl()).mask('Loading...', 'loading');
				},

				'featuresadded': function (evt) {
					this.map.zoomToExtent(this.getDataExtent());
					Ext.get(mapPanel.getEl()).unmask();
				}
			},

			styleMap: new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(
					Civic.util.Util.def_template, {
						context: Civic.util.Util.context
					}
				),
				'select': new OpenLayers.Style(
					Civic.util.Util.sel_template, {
						context: Civic.util.Util.context
					}
				)
			}),

			protocol: new OpenLayers.Protocol.HTTP({
				url: 'php/gis/list.php',
				params: {
					start: 0,
                	limit: 10
				},
				format: new OpenLayers.Format.GeoJSON()
			}),

			strategies: [
				new OpenLayers.Strategy.Fixed()
			]
		});

        layers.push(base, vecLayer);

        mapPanel.map.addLayers(layers);
    	me.setMousePointerSwitcher(mapPanel);

    	mapPanel.map.addControl(
    		new OpenLayers.Control.SelectFeature(vecLayer,{
    			id: 'olSelect',
				classname: 'navig',
    			autoActivate: false,
    			hover: true,
    			onSelect: function (feature) {
    				me.onFeatureSelect(feature);
    			},
    			onUnselect: function (feature) {
    				me.onFeatureUnselect(feature);
    			},
    			eventListeners: {
    				'beforefeaturehighlighted': function (evt) {
    					e = vecLayer.getFeatureBy('renderIntent','select');
    					if (e) {
    						this.unhighlight(e);    						
    					};
    				}
    			}
    		})
    	);
    	
        // some more controls
    /*    mapPanel.map.addControls([new OpenLayers.Control.DragFeature(vecLayer, {
            autoActivate: true,
            onComplete: function(feature, px) {
                var store = me.getSummitsStore();
                store.fireEvent('update', store, store.getByFeature(feature));
            }
        })]);

        // for dev purpose
    */
    },

    onMapPanelBeforeRender2: function(mapPanel, eOpts) {
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

        layers.push(base);

        mapPanel.map.addLayers(layers);
    	me.setMousePointerSwitcher(mapPanel);
    },

    onLaunch: function() {
        var me = this;

        // for dev purpose
        ctrl = this;
    },

    onJobsStoreLoad: function(store, records, successful, eOpts) {
        
        var map = this.getMapPanel().map,
        	vecLayer = map.getLayersByName('priority jobs')[0];

        if (successful) {        	
        	if (records[0].index > 0) {
        		vecLayer.addOptions({
        			protocol: new OpenLayers.Protocol.HTTP({
						url: 'php/gis/list.php',
						params: {
							start: records[0].index,
		                	limit: 10
						}, format: new OpenLayers.Format.GeoJSON()
					})
        		}, true);

        		vecLayer.refresh();
        	};
        };
    },

	setMousePointerSwitcher: function (mapPanel) {

		var mousePointerStyle = 'default';

		var MOUSE_POINTER_STYLES = {
		    'olDragPan': "url('http://127.0.0.1/civicreporter_dev/resources/images/app/pan.cur'), default",
		    'olSelect': "url('http://127.0.0.1/civicreporter_dev/resources/images/app/pan.cur'), default",
		    'olZoomIn': "url('http://127.0.0.1/civicreporter_dev/resources/images/app/zoom-in.cur'), default",
		    'olZoomOut': "url('http://127.0.0.1/civicreporter_dev/resources/images/app/zoom-out.cur'), default",
		    'none': 'default'
		};

		map = mapPanel.map;

		var panelControls = map.getControlsBy('classname', 'navig'),
			mapViews = document.getElementsByClassName('olMap');

		for (var i = 0; i < panelControls.length; i = i + 1) {
			var c = panelControls[i];
			c.events.register('activate', c, function() {
				mousePointerStyle = MOUSE_POINTER_STYLES[this.id];
			});
		}

		map.events.register('mouseover', map, function (e) {
			
			for (var i = 0; i < mapViews.length; i ++) {
				mapViews[i].style.cursor = mousePointerStyle;
			}
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
	},

    onToolBarBeforeRender: function (tbar, eOpts) {
    	
    	map = this.getMapPanel().map;

    	buttonGroup2 = tbar.items.get(0);
    	buttonGroup2.items.add(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "Info",
            control: map.getControl('olSelect'),
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "feature info",
            iconCls: 'info'
        })));
    },

	onFeatureSelect: function (feature) {
		rec = Ext.create('Civic.model.public.AbstractJob', feature.attributes);
		properties = Ext.widget('civicr_attributes',{
			source: rec.getData(),
			sourceConfig: {
				status: {
					renderer: function (value, metaData, record) {
						 return Civic.util.Util.renderText(value, metaData, rec);
					}
				},
				job_id: {
					displayName: 'ID'
				},
				station: {
					renderer: function (value, metaData, record) {
						 return value == '' ? 'UNASSIGNED' : value;
					}
				}
			}
		});

		Ext.widget('civicr_pop',{
			iconCls: 'menu_jobs',
			location: feature,
			items: properties
		}).show();
	},

	onFeatureUnselect: function (feature) {
		pop = Ext.ComponentQuery.query('civicr_pop')[0];
		if (pop) {
			pop.close();
		}
	},
	
	onAttributesShow: function (item, e, eOpts) {
		jobsGrid = this.getMapPanel().up('jobspanel').down('engjobsgrid');
		
		if (jobsGrid.getCollapsed()) {
			jobsGrid.expand();
		}
	}
});
