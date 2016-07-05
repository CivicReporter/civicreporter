Ext.define('Civic.controller.engineering.DutyRoster', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],

	views: [
		'engineering.DutyRoster'
	],

	stores: [
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
			},
			'abstractroster button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'abstractroster button#refresh': {
				click: this.onButtonClickRefresh
			},
			'engdutyroster abstractroster': {
				selectionchange: this.onSelectionChange
			}
		});
	},

	onRender: function (component, options) {
		component.getStore().load();
	},

	onEdit: function (editor, e, options) {
		rec = e.record;
		this.onSelectionChange(e.grid.getSelectionModel(),[rec])
	},

	onCancelEdit: function (editor, e, options) {
		rec = e.record;
		store = e.grid.getStore();
		if (rec.phantom) {
            store.remove(rec);
        }
	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('abstractroster').filters.clearFilters();
	},

	onButtonClickRefresh: function (button, e, options) {
		button.up('abstractroster').getStore().reload();
	},

	onSelectionChange: function (model, records, eOpts) {
		var rec = records[0];
        if (rec) {
            this.getDutyRosterForm().loadRecord(rec);
        }
	}
});