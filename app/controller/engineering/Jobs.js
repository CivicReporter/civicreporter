Ext.define('Civic.controller.engineering.Jobs', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.view.Viewport',
		'Civic.util.Util'
	],

	views: [
		'engineering.Jobs'
	],

	stores: [
		'engineering.Jobs',
		'staticData.Status',
		'engineering.PendingCalls' 
	],

	refs: [
		{
			ref: 'jobsGrid',
			selector: 'jobspanel'
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
			'jobspanel': {
				render: this.onPanelRender,
				selectionchange: this.onSelectionChange
			},
			'jobspanel button#add': {
				click: this.onButtonClickAdd
			},
			'jobspanel button#edit': {
				click: this.onButtonClickEdit
			},
			'jobspanel button#delete': {
				//click: this.onButtonClickDelete
			},
			'jobspanel button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'jobwindow': {
				close: this.onWindowClose
			},
			'jobwindow engjobcalls': {
				//render: this.onPanelRender,
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
			'searchcall engjobcalls': {
				render: this.onPanelRender,
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
			grid.down('button#delete').enable();
		} else{
			grid.down('button#edit').disable();
			grid.down('button#delete').disable();
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
		win.show();
	},

	onButtonClickAdd2: function (button, e, options) {
		var win = Ext.widget('searchcall');
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
			callStore.add(records);
		}

		form.down('engjobcalls').reconfigure(callStore, this.getCallsGrid().cloneConfig().columns);
		var cancelBtn = searchWindow.down('button#cancel');
		cancelBtn.fireEvent('click', cancelBtn, e, options);
	},

	onButtonClickEdit: function (button, e, options) {
		var grid = button.up('jobspanel');
		record = grid.getSelectionModel().getSelection();
		callStore = record[0].calls();

		if (record[0]) {
			var win = Ext.widget('jobwindow');
			var form = win.down('form');
			var values = {
				job_id: record[0].get('job_id'),
				suburb: callStore.getAt(0).get('suburb'),
				status: record[0].get('status'),
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

		};
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
							Ext.Msg.alert('Error!', 'You cannot remove all calls from the job!');
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
		button.up('jobspanel').filters.clearFilters();
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('window').close();
	},

	onButtonClickSave: function (button, e, options) {
		console.log('hey');
	},

	onWindowClose: function (window, eOpts) {
		grid = this.getJobsGrid();
		grid.getSelectionModel().deselectAll();
		grid.fireEvent('render', grid);
	} 
});