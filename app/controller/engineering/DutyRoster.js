Ext.define('Civic.controller.engineering.DutyRoster', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],

	views: [
		'engineering.DutyRoster'
	],

	stores: [
		'staticData.Staff',
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
				selectionchange: this.onSelectionChange
			},
			'abstractroster combobox': {
				render: this.onComboRender
			}
		});

	/*	this.listen({
			store: {
				'#staticDataAbstract': {
					write: this.onStoreSync
				}
			}
		})*/
	},

	onRender: function (component, options) {

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
			case 'abstractroster': 
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

		var gridStore = component.getStore();
		gridStore.load();
		gridStore.filter('active', 't');//not working
	},

	onSelectionChange: function (model, records, eOpts) {
		var rec = records[0];
        if (rec) {
            this.getDutyRosterForm().loadRecord(rec);
        }
	},

	onComboRender: function (combo, eOpts) {
		combo.getStore().load();
		this.getStaticDataActiveStatusStore().load();
	}

	/*

	onStoreSync: function (store, operation, options) {
		Civic.util.Alert.msg('Success!', 'Your changes have been saved.')
	}*/
});