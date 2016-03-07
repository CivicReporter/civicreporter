Ext.define('Civic.controller.engineering.Jobs', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.view.Viewport',
		'Civic.util.Util'
	],

	views: [
		'civicr.JobsPanel'
	],

	stores: [
		'engineering.Jobs',
		'engineering.PendingCalls' 
	],

	refs: [
		{
			ref: 'jobsGrid',
			selector: 'engjobsgrid'
		},{
			ref: 'jobWindow',
			selector: 'jobwindow'
		},{
			ref: 'callsGrid',
			selector: 'jobwindow engjobcalls'
		},{
			ref: 'searchWindow',
			selector: 'searchcall'
		}
	],
	
	init: function(application){
		this.control({
			//---engineering jobsgrid---
			'engjobsgrid': {
				render: this.onPanelRender,
				selectionchange: this.onSelectionChange
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
				close: this.onWindowClose
			},
			'jobwindow engjobcalls': {
				selectionchange: this.onSelectionChange2
			},
			'jobwindow engjobcalls button#add': {
				click: this.onButtonClickAdd2
			},
			'jobwindow engjobcalls button#delete': {
				click: this.onButtonClickDelete
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
			'searchcall form combobox': {
				render: this.onComboRender,
				select: this.onComboSelect,
				specialkey: this.onSpecialKeyPress
			},
			'searchcall engjobcalls': {
				selectionchange: this.onSelectionChange3
			},
			'searchcall button#cancel': {
				click: this.onButtonClickCancel
			},
			'searchcall button#clear': {
				click: this.onButtonClickClear
			},
			'searchcall button#add': {
				click: this.onButtonClickAdd3
			}			
		});
	},

	onPanelRender: function (component, options) {
		component.getStore().load();
	},

	onSelectionChange: function (selModel, selected, eOpts) {
		grid = this.getJobsGrid();

		if (selModel.hasSelection()) {		
			grid.down('button#edit').enable();
			grid.down('button#close').enable();
			grid.down('button#cancel').enable();
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
		searchWindow = this.getSearchWindow();
		records = searchWindow.down('engjobcalls').getSelectionModel().getSelection();
		form = this.getJobWindow().down('form');
		callStore = form.down('engjobcalls').getStore();

		if (callStore.data.length == 0) {
			callStore = Ext.create('Civic.store.engineering.Calls', {
				data: records
			});
			
			form.getForm().setValues({
				suburb: records[0].get('suburb')
			});
		} else{
			if (records[0].get('suburb') == callStore.data.getAt(0).get('suburb')) {
				callStore.add(records);
			} else{
				Civic.util.Util.showErrorMsg('<p>You cannot create a job with calls from different suburbs.</p>'+'<p>These calls are not linked!</p>');				
			};
		}

		form.down('engjobcalls').reconfigure(callStore, this.getCallsGrid().cloneConfig().columns);
		var cancelBtn = searchWindow.down('button#cancel');
		cancelBtn.fireEvent('click', cancelBtn, e, options);
	},

	onButtonClickEdit: function (button, e, options) {
		var grid = button.up('engjobsgrid');
		record = grid.getSelectionModel().getSelection();
		callStore = record[0].calls();

		if (record[0]) {
			status = record[0].get('status');

			if (status == 'OPEN') {

				var win = Ext.widget('jobwindow');
				var form = win.down('form');
				var values = {
					job_id: record[0].get('job_id'),
					suburb: callStore.getAt(0).get('suburb'),
					status: status,
					opened_on: record[0].get('opened_on'),
					opened_by: record[0].get('opened_by'),
					closed_on: record[0].get('closed_on'),
					closed_by: record[0].get('closed_by')
				};

				form.getForm().setValues(values);
				form.down('engjobcalls').reconfigure(callStore, this.getCallsGrid().cloneConfig().columns);
				form.down('tabpanel').setActiveTab(2);

				win.setTitle('Editing Job #' + values.job_id);
				win.setIconCls('call_edit');
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

	onButtonClickClear: function (button, e, options) {
		grid = this.getSearchWindow().down('engjobcalls');
		grid.getSelectionModel().deselectAll();		
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('engjobsgrid').filters.clearFilters();
	},

	onItemClick: function (column, action, view, e, record) {
		status = record.get('status');

		if (action == 'cancel') {

			if (status == 'OPEN') {
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

			if (status == 'OPEN') {
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

			} else {
				Civic.util.Util.showErrorMsg('This job is already '+status+' !');
			};
		};
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('window').close();
	},

	onButtonClickSave: function (button, e, options) {
		var callsList = [];
		win = this.getJobWindow();
		grid = this.getJobsGrid();
		form = win.down('form');

		form.down('engjobcalls').getStore().each(function (record) {
			callsList.push(record.get('call_id'));
		});
			
		Ext.get(win.getEl()).mask('Saving...Please Wait...', 'loading');

		form.getForm().submit({
			clientValidation: false,
			url: 'php/engineering/jobs/saveJob.php',
			params: {
				calls: Ext.JSON.encode(callsList)
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
	},

	onWindowClose2: function (window, eOpts) {
		window.down('engjobcalls').getStore().removeAll();
	},

	onComboRender: function (combo, eOpts) {
		combo.getStore().sort('name', 'ASC');
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

	onSpecialKeyPress: function (combo, e, eOpts) {
		if (e.getKey() == e.ENTER) {
			combo.fireEvent('select', combo);
		};
	} 
});