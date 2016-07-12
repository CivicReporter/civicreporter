Ext.define('Civic.controller.engineering.DutyRoster', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],

	views: [
		'staticData.Staff',
		'engineering.DutyRoster'
	],

	stores: [
		'staticData.Staff',
		'engineering.ActiveStaff',
		'engineering.AvailableStaff',
		'engineering.StaffStatus',
		'staticData.ActiveStatus'
	],

	refs: [
		{
			ref: 'dutyRosterForm',
			selector: 'engdutyroster'
		}
	],
	
	init: function(application){
		this.control({
			'abstractroster': {
				render: this.onRender,
				edit: this.onEdit,
				canceledit: this.onCancelEdit
			}/*,
			'staffgrid button#add': {
				click: this.onButtonClickAdd
			},
			'abstractroster button#save': {
				click: this.onButtonClickSave
			},
			'abstractroster button#cancel': {
				click: this.onButtonClickCancel
			},
			'abstractroster button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'abstractroster button#refresh': {
				click: this.onButtonClickRefresh
			},
			'staffgrid actioncolumn': {
				itemclick: this.handleActionColumn
			},
			'engdutyroster': {
				selectionchange: this.onSelectionChange
			},
			'abstractroster combobox': {
				render: this.onComboRender
			}*/
		});
	},

	onRender: function (component, options) {
		component.getStore().load();
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

	onButtonClickAdd: function (button, e, options) {
		var grid = button.up('abstractroster');
		store = grid.getStore();
		modelName = store.getProxy().getModel().modelName;
		rowEditing = grid.getPlugin('rowplugin');

		store.insert(0, Ext.create(modelName, {
			last_update: new Date()
		}));

		rowEditing.startEdit(0, 1);
	},

	onButtonClickSave: function (button, e, options) {
		var me = this;
		store = button.up('abstractroster').getStore();
		store.sync({
			success: function (batch) {
				me.onStoreSync(batch);
				store.load();
			}
		});
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('abstractroster').getStore().reload();
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('abstractroster').filters.clearFilters();
	},

	onButtonClickRefresh: function (button, e, options) {
		button.up('abstractroster').getStore().reload();
	},

	handleActionColumn: function (column, action, view, rowIndex, colIndex, item, e) {
		var store = view.up('staffgrid').getStore();
		rec = store.getAt(rowIndex);

		if (action == 'delete') {
			store.remove(rec);

			Ext.Msg.alert('Delete', 'Save changes to persist the removed record.');
		};
	},

	onSelectionChange: function (model, records, eOpts) {
		var rec = records[0];
        if (rec) {
            this.getDutyRosterForm().loadRecord(rec);
        }
	},

	onComboRender: function (combo, eOpts) {
		combo.getStore().load();
		//this.getStaticDataActiveStatusStore().load();
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