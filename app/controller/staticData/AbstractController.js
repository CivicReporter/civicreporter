Ext.define('Civic.controller.staticData.AbstractController', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],

	views: [
	//	'staticData.AbstractGrid',
		'staticData.EmergencyCodes',
		'staticData.FaultCodes',
		'staticData.FireCodes',
		'staticData.Properties',
		'staticData.Staff',
		'staticData.Sections',
		'staticData.Stations',
		'staticData.Suburbs',
		'staticData.Vehicles',
		'staticData.Zones'
	],

	stores: [
		'staticData.EmergencyCodes',
		'staticData.FaultCodes',
		'staticData.FireCodes',
		'staticData.Properties',
		'staticData.Staff',
		'staticData.Sections',
		'staticData.Stations',
		'staticData.Suburbs',
		'staticData.Vehicles',
		'staticData.Zones' 
	],
	
	init: function(application){
		this.control({
			'staticdatagrid': {
				beforerender: this.render,
				edit: this.onEdit,
				canceledit: this.onCancelEdit
			},
			'staticdatagrid button#add': {
				click: this.onButtonClickAdd
			},
			'staticdatagrid button#save': {
				click: this.onButtonClickSave
			},
			'staticdatagrid button#cancel': {
				click: this.onButtonClickCancel
			},
			'staticdatagrid button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'staticdatagrid button#refresh': {
				click: this.onButtonClickRefresh
			},
			'staticdatagrid button#print': {
				click: this.onButtonClickPrint
			},
			'staticdatagrid button#toPdf': {
				click: this.onButtonClickPDF
			},
			'staticdatagrid button#toExcel': {
				click: this.onButtonClickExcel
			},
			'staticdatagrid actioncolumn': {
				itemclick: this.handleActionColumn
			}
		});

	/*	this.listen({
			store: {
				'#staticDataAbstract': {
					write: this.onStoreSync,
					update: this.onStoreSync
				}
			}
		});*/
	},

	render: function (component, options) {

	/*	function loadStore (storename) {
			store = Ext.getStore(storename);

			if (store.data.items.length == 0) {
				store.load();				
			}
		}

		switch (component.getXType()) {
			case 'faultcodesgrid': 
				loadStore('staticData.Sections');
				break;
			case 'suburbsgrid': 
				loadStore('staticData.Zones');
				break;
			case 'vehiclesgrid': 
				loadStore('staticData.Stations');
				break;
		};
	*/
		var gridStore = component.getStore();
		gridStore.load();
	//	gridStore.sort('%id', 'ASC');
	},

	onButtonClickAdd: function (button, e, options) {
		var grid = button.up('staticdatagrid');
		store = grid.getStore();
		modelName = store.getProxy().getModel().modelName;
		rowEditing = grid.getPlugin('rowplugin');

		store.insert(0, Ext.create(modelName, {
			last_update: new Date()
		}));

		rowEditing.startEdit(0, 1);
	},

	onEdit: function (editor, e, options) {
		Ext.Msg.alert('Update', 'Save changes to persist the modified record.');
	},

	onCancelEdit: function (editor, e, options) {
		rec = e.record;
		store = e.grid.getStore();
		if (rec.phantom) {
            store.remove(rec);
        }
	},

	handleActionColumn: function (column, action, view, rowIndex, colIndex, item, e) {
		var store = view.up('staticdatagrid').getStore();
		rec = store.getAt(rowIndex);

		if (action == 'delete') {
			store.remove(rec);

			Ext.Msg.alert('Delete', 'Save changes to persist the removed record.');
		};
	},

	onButtonClickSave: function (button, e, options) {
		var me = this;
		store = button.up('staticdatagrid').getStore();
		store.sync({
			success: function (batch) {
				me.onStoreSync(batch);
				store.load();
			}
		});
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('staticdatagrid').getStore().reload();
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('staticdatagrid').filters.clearFilters();
	},

	onButtonClickRefresh: function (button, e, options) {
		button.up('staticdatagrid').getStore().reload();
	},

	onButtonClickPrint: function (button, e, options) {
		//button.up('engcallsgrid').filters.clearFilters();
	},

	onButtonClickPDF: function (button, e, options) {
	/*	var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
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
		mainPanel.setActiveTab(newTab); */
	},

	onButtonClickExcel: function (button, e, options) {
	//	window.open('php/pdf/exportCallsExcel.php');
	},

	onStoreSync: function (batch) {		 
		batch.operations.forEach(function (value) {
			switch (value.action) {
				case 'create':
					Ext.Msg.alert('Success!', 'New records created.');
					break;
				case 'update':
					Ext.Msg.alert('Success!', 'Your changes have been saved.');
					break;
				case 'destroy':
					Ext.Msg.alert('Success!', 'Records deleted.');
					break;
				default:
					Ext.Msg.alert('Success!', 'Records loaded.');
					break;
			};
		})			
	}
});