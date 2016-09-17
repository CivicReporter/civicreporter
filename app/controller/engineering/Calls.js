Ext.define('Civic.controller.engineering.Calls', {
	extend: 'Ext.app.Controller',

	requires: [
	//	'Civic.util.Alert',
	//	'Civic.util.MD5',
		'Civic.view.Viewport',
		'Civic.util.Util',
		'Ext.ux.IFrame' 
	],

	views: [
		'engineering.Calls'
	],

	stores: [
		'engineering.Calls',
		'staticData.FaultCodes',
		'staticData.Suburbs',
		'staticData.Callers' 
	],

	refs: [
		{
			ref: 'engCallsGrid',
			selector: 'engcallsgrid'
		},{
			ref: 'streetCombo',
			selector: 'callwindow form combobox#street'
		},{
			ref: 'suburbCombo',
			selector: 'callwindow form combobox#suburb'
		}
	],
	
	init: function(application){
		this.control({
			//---engineering calls grid---
			'engcallsgrid': {
				render: this.render,
				selectionchange: this.onSelectionChange
			},
			'engcallsgrid button#add': {
				click: this.onButtonClickAdd
			},
			'engcallsgrid button#edit': {
				click: this.onButtonClickEdit
			},
			'engcallsgrid button#cancel': {
				click: this.onButtonClickDelete
			},
			'engcallsgrid button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'engcallsgrid button#print': {
				click: this.onButtonClickPrint
			},
			'engcallsgrid button#toPdf': {
				click: this.onButtonClickPDF
			},
			'engcallsgrid button#toExcel': {
				click: this.onButtonClickExcel
			},
			//---call edit window---
			'callwindow': {
				show: this.onShow
			},
			'callwindow button#cancel': {
				click: this.onButtonClickCancel
			},
			'callwindow button#save': {
				click: this.onButtonClickSave
			},
			'callwindow form textfield': {
				specialkey: this.onTextfieldSpecialKey
			},
			'callwindow form combobox#suburb': {
				select: this.onComboSelect
			}			
		});
	},

	render: function (component, options) {
		component.getStore().load();
	},

	onShow: function (win, eOpts) {
		var me = this,
			streets = me.getStreetCombo(),
			suburb = me.getSuburbCombo(),
			comboStore = streets.getStore();

		if (comboStore.isFiltered()) {
			comboStore.clearFilter(true);
		};

		comboStore.filter('suburb_id', suburb.getValue());

		if (streets.value) {			
			streets.enable();
		};
	},

	onSelectionChange: function (selModel, selected, eOpts) {
		grid = this.getEngCallsGrid();

		if (selModel.hasSelection()) {
			
			grid.down('button#edit').enable();
			grid.down('button#cancel').enable();
		} else{

			grid.down('button#edit').disable();
			grid.down('button#cancel').disable();
		};
	},

	onButtonClickAdd: function (button, e, options) {
		var win = Ext.create('Civic.view.engineering.CallWindow');
		win.show();
	},

	onButtonClickEdit: function (button, e, options) {
		var grid = button.up('engcallsgrid');
		record = grid.getSelectionModel().getSelection();
		var callersStore = Ext.getStore('staticData.Callers');

		if (record[0]) {
			status = record[0].get('status');

			if (status == 'OPEN') {
				var editWindow = Ext.create('Civic.view.engineering.CallWindow');
				var form = editWindow.down('form');
				var callerId = record[0].get('caller_id');
				var caller = callersStore.findRecord('caller_id', callerId);

				var values = {
					firstname: caller.get('firstname'),
					lastname: caller.get('surname'),
					nid: record[0].get('nid'),
					phone: caller.get('phone'),
					call_id: record[0].get('call_id'),
					caller_id: callerId,
					code: record[0].get('code_id'),
					suburb: record[0].get('suburb_id'),
					street: record[0].get('street'),
					stand_no: record[0].get('stand_no'),
					severity: record[0].get('severity'),
					description: record[0].get('description'),
					property_damage: record[0].get('property_damage') 
				};

				form.getForm().setValues(values);

				editWindow.setTitle('Editing Call #' + record[0].get('call_id'));
				editWindow.setIconCls('call_edit');
				editWindow.show();
			} else {				
				Civic.util.Util.showErrorMsg('You cannot edit a '+status+' call!');
			}
		};
	},

	onButtonClickDelete: function (button, e, options) {
		var grid = button.up('engcallsgrid');
		var store = grid.getStore();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			status = record[0].get('status');

			if (status == 'OPEN') {
				Ext.Msg.show({
					title: 'Cancel Call?',
					msg: 'Are you sure you want to cancel the selected call?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (buttonId) {
						if (buttonId == 'yes') {
							Ext.Ajax.request({
	                            url: 'php/engineering/calls/deleteCall.php',
	                            params: {
	                                call_id: record[0].get('call_id')
	                            },
	                            success: function(conn, response, options, eOpts) {

	                                var result = Civic.util.Util.decodeJSON(conn.responseText);

	                                if (result.success) {
	                                    //Civic.util.Alert.msg('Success!', 'Call Deleted.');
										Ext.Msg.alert('Success!', 'Call status set to "CANCELLED".');

	                                    store.load();
	                                    Ext.getStore('staticData.Callers').load();                                  
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
				Civic.util.Util.showErrorMsg('This call is currently '+status+' !');				
			}
		}
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('engcallsgrid').filters.clearFilters();
	},

	onButtonClickPrint: function (button, e, options) {
		//button.up('engcallsgrid').filters.clearFilters();
	},

	onButtonClickPDF: function (button, e, options) {
		var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
		newTab = mainPanel.add({      
			xtype: 'panel',        
			closable: true,        
			iconCls: 'to_pdf',        
			title: 'Calls PDF',        
			layout: 'fit',        
			items: [{            
				xtype: 'uxiframe',            
				src: 'php/pdf/exportCallsPdf.php'       
			}]    
		});
		mainPanel.setActiveTab(newTab); 
	},

	onButtonClickExcel: function (button, e, options) {
		window.open('php/pdf/exportCallsExcel.php');
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('window').close();
	},

	onButtonClickSave: function (button, e, options) {
		var win = button.up('window');
		formPanel = win.down('form');

		store = this.getEngineeringCallsStore();

		if (formPanel.getForm().isValid()) {
			Ext.get(win.getEl()).mask('Saving...Please Wait...', 'loading');
			formPanel.getForm().submit({
				clientValidation: true,
				url: 'php/engineering/calls/saveCall.php',
				success: function (form, action) {
					Ext.get(win.getEl()).unmask();

					var result = action.result;

					if (result.success) {
						//Civic.util.Alert.msg('Call Saved Successfully!');
						Ext.Msg.alert('Success', 'Call Saved Successfully!');
						store.load();
                        Ext.getStore('staticData.Callers').load();
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
			})
		};
	},

	onTextfieldSpecialKey: function (field, e, options) {
		if (e.getKey()==e.ENTER) {
			var saveBtn = field.up('window').down('button#save');
			saveBtn.fireEvent('click', saveBtn, e, options);
		}
	},

	onComboSelect: function (combo, records, eOpts) {
		var me = this,
			streets = me.getStreetCombo(),
			comboStore = streets.getStore();

		if (comboStore.isFiltered()) {
			comboStore.clearFilter(true);
		};

		comboStore.filter('suburb_id', combo.getValue());
		streets.clearValue();

		if (streets.isDisabled()) {			
			streets.enable();
		};
	}
});