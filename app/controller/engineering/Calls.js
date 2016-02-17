Ext.define('Civic.controller.engineering.Calls', {
	extend: 'Ext.app.Controller',

	requires: [
	//	'Civic.util.Alert',
	//	'Civic.util.MD5',
		'Civic.view.Viewport',
		'Civic.util.Util'
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
			'engcallsgrid button#delete': {
				click: this.onButtonClickDelete
			},
			'engcallsgrid button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			//---call edit window---
			'callwindow button#cancel': {
				click: this.onButtonClickCancel
			},
			'callwindow button#save': {
				click: this.onButtonClickSave
			},
			'callwindow form textfield': {
				specialkey: this.onTextfieldSpecialKey
			}			
		});
	},

	render: function (component, options) {
		component.getStore().load();

		function loadStore (storename) {
			store = Ext.getStore(storename);

			if (store.data.items.length == 0) {
				store.load();				
			}
		}

		loadStore('staticData.FaultCodes');
		loadStore('staticData.Suburbs');
		loadStore('staticData.Callers');
	},

	onSelectionChange: function (selModel, selected, eOpts) {
		grid = this.getEngCallsGrid();

		if (selModel.hasSelection()) {
			
			grid.down('button#edit').enable();
			grid.down('button#delete').enable();
		} else{

			grid.down('button#edit').disable();
			grid.down('button#delete').disable();
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
			var editWindow = Ext.create('Civic.view.engineering.CallWindow');

			var form = editWindow.down('form');

			var callerId = record[0].get('caller_id');

			var caller = callersStore.findRecord('caller_id', callerId);

			var values = {
				firstname: caller.get('firstname'),
				lastname: caller.get('surname'),
				phone: caller.get('phone'),
				call_id: record[0].get('call_id'),
				caller_id: callerId,
				code: record[0].get('code'),
				suburb: record[0].get('suburb'),
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
		};
	},

	onButtonClickDelete: function (button, e, options) {
		var grid = button.up('engcallsgrid');
		var store = grid.getStore();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			Ext.Msg.show({
				title: 'Delete Call?',
				msg: 'Are you sure you want to delete the selected call?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (buttonId) {
					if (buttonId == 'yes') {
						Ext.Ajax.request({
                            url: 'php/engineering/calls/deleteCall.php',
                            params: {
                                caller_id: record[0].get('caller_id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = Civic.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {
                                    //Civic.util.Alert.msg('Success!', 'Call Deleted.');
									Ext.Msg.alert('Success!', 'Call Deleted.');

                                    store.load();                                  
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
		}
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('engcallsgrid').filters.clearFilters();
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
	} 
});