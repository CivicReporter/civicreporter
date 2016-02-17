Ext.define('Civic.controller.staticData.AbstractController', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],

	views: [
		'staticData.AbstractGrid',
		'staticData.EmergencyCodes',
		'staticData.FaultCodes',
		'staticData.FireCodes',
		'staticData.Properties',
		'staticData.Sections',
		'staticData.Staff',
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
		'staticData.Sections',
		'staticData.Staff',
		'staticData.Stations',
		'staticData.Suburbs',
		'staticData.Vehicles',
		'staticData.Zones' 
	],
	
	init: function(application){
		this.control({
			'staticdatagrid': {
				render: this.render,
				edit: this.onEdit
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
			'staticdatagrid actioncolumn': {
				itemclick: this.handleActionColumn
			}
		});

		this.listen({
			store: {
				'#staticDataAbstract': {
					write: this.onStoreSync
				}
			}
		})
	},

	render: function (component, options) {

		function loadStore (storename) {
			store = Ext.getStore(storename);

			if (store.data.items.length == 0) {
				store.load();				
			}
		}

		switch (component.getXType()) {
			case 'faultcodesgrid': 
				loadStore('staticData.Sections');
				break;
			case 'staffgrid': 
				loadStore('staticData.Sections');
				loadStore('staticData.Stations');
				break;
			case 'suburbsgrid': 
				loadStore('staticData.Zones');
				break;
			case 'vehiclesgrid': 
				loadStore('staticData.Stations');
				break;
		};

		component.getStore().load();
	},

	onButtonClickAdd: function (button, e, options) {
		var grid = button.up('staticdatagrid');
		store = grid.getStore();
		modelName = store.getProxy().getModel().modelName;
		cellEditing = grid.getPlugin('cellplugin');

		store.insert(0, Ext.create(modelName, {
			last_update: new Date()
		}));

		cellEditing.startEditByPosition({row: 0, column: 1});
	},

	onEdit: function (editor, context, options) {
		context.record.set('last_update', new Date());
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
		button.up('staticdatagrid').getStore().sync();
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('staticdatagrid').getStore().reload();
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('staticdatagrid').filters.clearFilters();
	},

	onStoreSync: function (store, operation, options) {
		Civic.util.Alert.msg('Success!', 'Your changes have been saved.')
	}
});