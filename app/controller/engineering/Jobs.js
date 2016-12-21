Ext.define('Civic.controller.engineering.Jobs', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.view.Viewport',
		'Civic.util.Util',
		'Civic.view.civcr.AbstractJobDetails',
		'Civic.view.engineering.SearchCall',
		'Civic.view.engineering.SearchStaff',
		'Civic.view.gis.EditingToolbar'
	],

	views: [
		'civicr.JobsPanel'
	],

	stores: [
		'engineering.Jobs',
		'engineering.PendingCalls',
		'engineering.AvailableStaff' 
	],

	refs: [
		{
			ref: 'jobsGrid',
			selector: 'engjobsgrid'
		},{
			ref: 'mapPanel',
			selector: 'civicr_map'
		},{
			ref: 'jobWindow',
			selector: 'jobwindow'
		},{
			ref: 'callsGrid',
			selector: 'jobwindow engjobcalls'
		},{
			ref: 'staffGrid',
			selector: 'jobwindow engjobstaff'
		},{
			ref: 'searchWindow',
			selector: 'searchwindow'//searchcall
		},{
			ref: 'editingToolbar',
			selector: 'editingtoolbar'
		}
	],
	
	init: function(application){
		this.control({
			//---engineering jobsgrid---
			'engjobsgrid': {
				render: this.onPanelRender,
				selectionchange: this.onSelectionChange,
				celldblclick: this.onDoubleClick
			},
			'engjobsgrid button#add': {
				click: this.onButtonClickAdd
			},
			'engjobsgrid button#edit': {
				click: this.onButtonClickEdit
			},
			'engjobsgrid button#close': {
				click: this.onButtonClickCloseJob
			},
			'engjobsgrid button#cancel': {
				click: this.onButtonClickCancelJob
			},
			'engjobsgrid button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'engjobsgrid actioncolumn': {
				itemclick: this.onItemClick
			},
			'jobwindow': {
				close: this.onWindowClose,
				minimize: this.onWindowMinimize
			},
			'jobwindow engjobcalls': {
				selectionchange: this.onSelectionChange2
			},
			'jobwindow engjobstaff': {
				selectionchange: this.onSelectionChange4
			},
			'jobwindow engjobcalls button#add': {
				click: this.onButtonClickAdd2
			},
			'jobwindow engjobcalls button#delete': {
				click: this.onButtonClickDelete
			},
			'jobwindow engjobstaff button#delete': {
				click: this.onButtonClickDelete2
			},
			'jobwindow button#back': {
				click: this.onButtonClickBack
			},
			'jobwindow button#next': {
				click: this.onButtonClickNext
			},
			'jobwindow button#cancel': {
				click: this.onButtonClickCancel
			},
			'jobwindow button#save': {
				click: this.onButtonClickSave
			},
			'searchcall': {
				close: this.onWindowClose2
			},
			'searchstaff': {
				close: this.onWindowClose3
			},
			'searchcall form combobox': {
				render: this.onComboRender,
				select: this.onComboSelect,
				specialkey: this.onSpecialKeyPress
			},
			'searchstaff form combobox': {
				render: this.onComboRender2,
				select: this.onComboSelect2,
				specialkey: this.onSpecialKeyPress
			},
			'searchwindow abstractjobdetails': {
				selectionchange: this.onSelectionChange3
			},
			'searchwindow button#cancel': {
				click: this.onButtonClickCancel
			},
			'searchwindow button#clear': {
				click: this.onButtonClickClear
			},
			'searchcall button#add': {
				click: this.onButtonClickAdd3
			},
			'searchstaff button#add': {
				click: this.onButtonClickAdd5
			},
			'jobwindow engjobstaff button#add': {
				click: this.onButtonClickAdd4
			},
			'jobwindow form button#point': {
				click: this.onButtonClickPoint
			},
			'editingtoolbar': {
				close: this.onEditorClose
			},
			'editingtoolbar toolbar': {
				beforerender: this.onEditorRender
			}				
		});
	},

	onPanelRender: function (component, options) {
		component.getStore().load();
	},

	onSelectionChange: function (selModel, selected, eOpts) {
		grid = this.getJobsGrid();
		map = this.getMapPanel().map;

		if (selModel.hasSelection()) {		
			grid.down('button#edit').enable();
			grid.down('button#close').enable();
			grid.down('button#cancel').enable();

			//vector layer selection
			var rec = selModel.getSelection()[0],
				selControl = map.getControl('olSelect'),
				vecLayer = map.getLayersByName('priority jobs')[0];
			
			selControl.highlight(vecLayer.getFeaturesByAttribute('job_id', String(rec.get('job_id')))[0]);

		} else{
			grid.down('button#edit').disable();
			grid.down('button#close').disable();
			grid.down('button#cancel').disable();
		};
	},

	onSelectionChange2: function (selModel, selected, eOpts) {
		grid = this.getCallsGrid();

		if (selModel.hasSelection()) {			
			grid.down('button#delete').enable();
		} else{
			grid.down('button#delete').disable();
		};
	},

	onSelectionChange3: function (selModel, selected, eOpts) {
		grid = this.getSearchWindow();

		if (selModel.hasSelection()) {			
			grid.down('button#clear').enable();			
			grid.down('button#add').enable();
		} else{
			grid.down('button#clear').disable();
			grid.down('button#add').disable();
		};
	},

	onSelectionChange4: function (selModel, selected, eOpts) {
		grid = this.getStaffGrid();

		if (selModel.hasSelection()) {			
			grid.down('button#delete').enable();
		} else{
			grid.down('button#delete').disable();
		};
	},
	
	onDoubleClick: function ( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		var map = this.getMapPanel().map,
			vecLayer = map.getLayersByName('priority jobs')[0],			
			job = vecLayer.getFeaturesByAttribute('job_id', String(record.get('job_id')))[0];
			
		map.zoomToExtent(job.geometry.getBounds());
	},

	onButtonClickAdd: function (button, e, options) {
		var win = Ext.widget('jobwindow');
		store = this.getEngineeringJobsStore();
		win.down('form').getForm().setValues({
			job_id: store.data.getAt(0).get('job_id') + 1,
			status: 'OPEN'
		});
		win.show();
	},

	onButtonClickAdd2: function (button, e, options) {
		var win = Ext.widget('searchcall');
		store = this.getEngineeringPendingCallsStore();
		win.down('engjobcalls').reconfigure(store, this.getCallsGrid().cloneConfig().columns);
		win.down('pagingtoolbar').bindStore(store);
		win.show();
	},

	onButtonClickAdd3: function (button, e, options) {
		var searchWindow = this.getSearchWindow(),
			records = searchWindow.down('engjobcalls').getSelectionModel().getSelection(),
			form = this.getJobWindow().down('form'),
			callStore = form.down('engjobcalls').getStore();

		if (callStore.data.length == 0) {
			callStore = Ext.create('Civic.store.engineering.Calls', {
				data: records
			});
			
			form.getForm().setValues({
				suburb: records[0].get('suburb_id')
			});
		} else{
			if (records[0].get('suburb_id') == callStore.data.getAt(0).get('suburb_id')) {
				callStore.add(records);
			} else{
				Civic.util.Util.showErrorMsg('<p>You cannot create a job with calls from different suburbs.</p>'+'<p>These calls are not linked!</p>');				
			};
		}

		form.down('engjobcalls').reconfigure(callStore, this.getCallsGrid().cloneConfig().columns);
		var cancelBtn = searchWindow.down('button#cancel');
		cancelBtn.fireEvent('click', cancelBtn, e, options);
	},

	onButtonClickAdd5: function (button, e, options) {
		searchWindow = this.getSearchWindow();
		records = searchWindow.down('engjobstaff').getSelectionModel().getSelection();
		form = this.getJobWindow().down('form');
		staffStore = form.down('engjobstaff').getStore();

		if (staffStore.data.length == 0) {
			staffStore = Ext.create('Civic.store.staticData.Staff', {
				data: records
			});			
			form.getForm().setValues({
				station: records[0].get('station_id'),
				status: 'ASSIGNED'
			});
		} else{
			if (records[0].get('station_id') == staffStore.data.getAt(0).get('station_id')) {
				staffStore.add(records);
			} else{
				Civic.util.Util.showErrorMsg('<p>You cannot assign a job to technicians from different stations!</p>');				
			};
		}

		form.down('engjobstaff').reconfigure(staffStore, this.getStaffGrid().cloneConfig().columns);
		var cancelBtn = searchWindow.down('button#cancel');
		cancelBtn.fireEvent('click', cancelBtn, e, options);
	},
	
	onButtonClickEdit: function (button, e, options) {
		var grid = button.up('engjobsgrid');
		record = grid.getSelectionModel().getSelection();
		callStore = record[0].calls();
		staffStore = record[0].staff();

		var map = this.getMapPanel().map,
			vecLayer = map.getLayersByName('priority jobs')[0],
			job = vecLayer.getFeaturesByAttribute('job_id', String(record[0].get('job_id')))[0];

		if (record[0]) {
			status = record[0].get('status');

			if (status == 'OPEN' || status == 'PENDING' || status == 'ASSIGNED') {

				var win = Ext.widget('jobwindow');
				var form = win.down('form');
				var values = {
					job_id: record[0].get('job_id'),
					suburb: callStore.getAt(0).get('suburb_id'),
					status: status,
					station: record[0].get('station') == '' ? '' : staffStore.getAt(0).get('station_id'),
					coordinates: job.geometry.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:32735")).toString(),
					opened_on: record[0].get('opened_on'),
					opened_by: record[0].get('opened_by'),
					closed_on: record[0].get('closed_on'),
					closed_by: record[0].get('closed_by')
				};

				form.getForm().setValues(values);
				form.down('engjobcalls').reconfigure(callStore, this.getCallsGrid().cloneConfig().columns);
				form.down('engjobstaff').reconfigure(staffStore, this.getStaffGrid().cloneConfig().columns);

				win.setTitle('Editing Job #' + values.job_id);
				win.setIconCls('edit');
				win.show();

			} else{
				Civic.util.Util.showErrorMsg('You cannot edit a '+status+' job!');
			};

		};
	},

	onButtonClickCloseJob: function (button, e, options) {
		var grid = button.up('engjobsgrid');
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			this.onItemClick(grid.down('actioncolumn'), 'close', grid.getView(), e, record[0]);			
		}
	},

	onButtonClickCancelJob: function (button, e, options) {
		var grid = button.up('engjobsgrid');
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			this.onItemClick(grid.down('actioncolumn'), 'cancel', grid.getView(), e, record[0]);				
		}
	},

	onButtonClickDelete: function (button, e, options) {
		var grid = button.up('engjobcalls');
		var store = grid.getStore();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			Ext.Msg.show({
				title: 'Remove Call?',
				msg: 'Are you sure you want to remove the selected call from the list?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (buttonId) {
					if (buttonId == 'yes') {
						if (store.data.length < 2) {
							Civic.util.Util.showErrorMsg('You cannot remove all calls from the job!');
						} else{							
							store.remove(record);
						};
					};
				}
			});
		}
	},

	onButtonClickDelete2: function (button, e, options) {
		var grid = button.up('engjobstaff');
		var store = grid.getStore();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			Ext.Msg.show({
				title: 'Remove Technician?',
				msg: 'Are you sure you want to remove the selected technician from the list?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (buttonId) {
					if (buttonId == 'yes') {
						if (store.data.length < 2) {
							Civic.util.Util.showErrorMsg('You cannot remove all technicians from the job!');
						} else{							
							store.remove(record);
						};
					};
				}
			});
		}
	},

	onButtonClickClear: function (button, e, options) {
		grid = this.getSearchWindow().down('abstractjobdetails');
		grid.getSelectionModel().deselectAll();		
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('engjobsgrid').filters.clearFilters();
	},

	onItemClick: function (column, action, view, e, record) {
		status = record.get('status');

		if (action == 'cancel') {

			if (status == 'OPEN' || status == 'ASSIGNED') {
				Ext.Msg.show({
					title: 'Cancel Job?',
					msg: 'Are you sure you want to cancel the selected job?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (buttonId) {
						if (buttonId == 'yes') {
							Ext.Ajax.request({
	                            url: 'php/engineering/jobs/saveJob.php',
	                            params: {
	                                job_id: record.get('job_id'),
	                                status: 'CANCELLED'
	                            },
	                            success: function(conn, response, options, eOpts) {
	                                var result = Civic.util.Util.decodeJSON(conn.responseText);

	                                if (result.success) {
	                                    //Civic.util.Alert.msg('Success!', 'Call Deleted.');
										Ext.Msg.alert('Success!', 'Job status set to "CANCELLED".');
	                                    view.getStore().load();                                  
	                                } else {
	                                    Civic.util.Util.showErrorMsg(conn.responseText);
	                                }
	                            },
	                            failure: function(conn, response, options, eOpts) {
	                                Civic.util.Util.showErrorMsg(conn.responseText);
	                            }
	                        });
						};
					}
				});
			}else{
				Civic.util.Util.showErrorMsg('This job is already '+status+' !');
			};

		} else if (action == 'close') {

			if (status == 'PENDING') {
				Ext.Msg.show({
					title: 'Close Job?',
					msg: 'Are you sure you want to close the selected job?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (buttonId) {
						if (buttonId == 'yes') {
							Ext.Ajax.request({
	                            url: 'php/engineering/jobs/saveJob.php',
	                            params: {
	                                job_id: record.get('job_id'),
	                                status: 'CLOSED'
	                            },
	                            success: function(conn, response, options, eOpts) {
	                                var result = Civic.util.Util.decodeJSON(conn.responseText);

	                                if (result.success) {
	                                    //Civic.util.Alert.msg('Success!', 'Call Deleted.');
										Ext.Msg.alert('Success!', 'Job status set to "CLOSED".');
	                                    view.getStore().load();                                  
	                                } else {
	                                    Civic.util.Util.showErrorMsg(conn.responseText);
	                                }
	                            },
	                            failure: function(conn, response, options, eOpts) {
	                                Civic.util.Util.showErrorMsg(conn.responseText);
	                            }
	                        });
						};
					}
				});

			} else if (status == 'OPEN' || status == 'ASSIGNED') {
				Civic.util.Util.showErrorMsg('You cannot close a job which is currently '+status+' !');

			}else {
				Civic.util.Util.showErrorMsg('This job is already '+status+' !');	
			};
		};
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('window').close();
	},

	onButtonClickSave: function (button, e, options) {
		var callsList = [];
		var staffList = [];
		win = this.getJobWindow();
		grid = this.getJobsGrid();
		form = win.down('form');

		form.down('engjobcalls').getStore().each(function (record) {
			callsList.push(record.get('call_id'));
		});

		form.down('engjobstaff').getStore().each(function (record) {
			staffList.push(record.get('staff_id'));
		});
			
		Ext.get(win.getEl()).mask('Saving...Please Wait...', 'loading');

		form.getForm().submit({
			clientValidation: false,
			url: 'php/engineering/jobs/saveJob.php',
			params: {
				calls: Ext.JSON.encode(callsList),
				staff: Ext.JSON.encode(staffList)
			},
			success: function (form, action) {
				Ext.get(win.getEl()).unmask();

				var result = action.result;

				if (result.success) {
					Ext.Msg.alert('Success', 'Job saved successfully!');
					grid.fireEvent('render', grid);
					win.close()
				} else {
					Civic.util.Util.showErrorMsg(result.msg);
				};
			},
			failure: function (form, action) {
				Ext.get(win.getEl()).unmask();

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
		});
	},

	onWindowClose: function (window, eOpts) {
		grid = this.getJobsGrid();
		grid.getSelectionModel().deselectAll();
		if (this.getEditingToolbar()) {
			this.getEditingToolbar().close();
		};
	},

	onWindowClose2: function (window, eOpts) {
		window.down('engjobcalls').getStore().removeAll();
	},

	onWindowClose3: function (window, eOpts) {
		window.down('engjobstaff').getStore().removeAll();
	},

	onComboRender: function (combo, eOpts) {
		var me = this,
			callsStore = me.getJobWindow().down('form').down('engjobcalls').getStore();

		if (callsStore.getAt(0)) {
			suburb = callsStore.getAt(0).get('suburb_id');

			combo.setValue(suburb);
			combo.fireEvent('select', combo);	
		};			
		
	},

	onComboRender2: function (combo, eOpts) {
		var me = this,
			suburbStore = Ext.getStore('staticData.Suburbs'),
			catchmentStore = Ext.getStore('staticData.Sewer'),//sewer catchments
			callsStore = me.getJobWindow().down('form').down('engjobcalls').getStore();

		if (callsStore.getAt(0)) {
			suburb = suburbStore.findRecord('suburb_id', callsStore.getAt(0).get('suburb_id'));
			catchment = catchmentStore.findRecord('catch_id', suburb.get('sewer_catch_id'));
			
			combo.setValue(catchment.get('station_id'));
			combo.fireEvent('select', combo);
		};
		
	},

	onComboSelect: function (combo, records, eOpts ) {
		pendingStore = this.getEngineeringPendingCallsStore();
		pendingStore.setProxy({
			type: 'cvr',
			url: 'php/engineering/calls/list.php',
			extraParams: {
				status: 'OPEN',
				suburb: combo.getValue()
			}
		});
		pendingStore.load();
	},

	onComboSelect2: function (combo, records, eOpts ) {
		pendingStore = this.getEngineeringAvailableStaffStore();
		pendingStore.setProxy({
			type: 'staffproxy',
			extraParams: {
				status: 'AVAILABLE',
				station: combo.getValue()
			}
		});
		pendingStore.load();
	},

	onSpecialKeyPress: function (combo, e, eOpts) {
		if (e.getKey() == e.ENTER) {
			combo.fireEvent('select', combo);
		};
	},

	onButtonClickAdd4: function (button, e, options) {
		var win = Ext.widget('searchstaff');
		store = this.getEngineeringAvailableStaffStore();
		win.down('engjobstaff').reconfigure(store, this.getStaffGrid().cloneConfig().columns);
		win.down('pagingtoolbar').bindStore(store);
		win.show();
	},

	onButtonClickBack: function (button, e, options) {
		this.navigate(button.up("form"), "prev");
	},

	onButtonClickNext: function (button, e, options) {
		this.navigate(button.up("form"), "next");
	},

	navigate: function (panel, direction) {
		var layout = panel.getLayout();
	    layout[direction]();

	    panel.down('button#back').setDisabled(!layout.getPrev());
	    panel.down('button#next').setDisabled(!layout.getNext());
	},

	onButtonClickPoint: function (button, e, options) {		
		var me = this;
			suburbStore = Ext.getStore('staticData.Suburbs'),
			suburb_id = button.up('form').getForm().getFieldValues().suburb;

		button.up('jobwindow').minimize();
		
		if (suburb_id) {
			suburb = suburbStore.findRecord('suburb_id', suburb_id),
			geom = OpenLayers.Geometry.fromWKT(suburb.get('geom_900913'));

			me.getMapPanel().map.zoomToExtent(geom.getBounds());				
		};
	},

	onWindowMinimize: function (window, eOpts) {
		var me = this,
			grid = me.getJobsGrid();

		grid.collapse();
		window.collapse();

		if (!Ext.ComponentQuery.query('editingtoolbar')[0]) {			
			Ext.widget('editingtoolbar').show();
		};
	},

	onEditorRender: function (tbar, eOpts) {

		var group = [],
			map = this.getMapPanel().map,
			drawControl = map.getControl('olDraw'),
			editWindow = tbar.up('editingtoolbar'); 

		group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: drawControl,
            disabled: false,
            enableToggle: true,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "draw point",
            iconCls: 'point'
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            //control: drawControl.undo(),
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "undo point",
            iconCls: 'undo'
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            //control: drawControl.redo(),
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "redo point",
            iconCls: 'redo'
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            //control: drawControl.cancel(),
            disabled: true,
            enableToggle: true,
            toggleGroup: "draw",
            allowDepress: false,
            group: "draw",
            tooltip: "select point",
            iconCls: 'delete'
        })));

        group.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            //control: drawControl.finishSketch(),
            disabled: true,
            enableToggle: false,
            group: "draw",
            tooltip: "save point",
            iconCls: 'save'
        })));

		tbar.items.add(group);
		drawControl.activate();	
	},

	onEditorClose: function (window, eOpts) {
		var me = this,
			win = me.getJobWindow(),
			map = me.getMapPanel().map,
			drawControl = map.getControl('olDraw');

		if (drawControl.active) {
			drawControl.cancel();
			map.getLayersByName('Point Layer')[0].removeAllFeatures();
			map.getControl('olDragPan').activate();
		}

		if (win.getCollapsed()) {
			win.expand();
		};
	}
});