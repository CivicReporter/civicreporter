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
		'staticData.ActiveStatus',
		'engineering.Jobs',
	],

	refs: [
		{
			ref: 'dutyRosterForm',
			selector: 'engdutyroster'
		},{
			ref: 'jobsHistoryGrid',
			selector: 'engjobshistory'
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
			},
			'engjobshistory': {
				//selectionchange: this.onStaffSelectionChange
			}

		});
	},

	onRender: function (component, options) {
		component.getStore().load();
	},

	onEdit: function (editor, e, options) {
		rec = e.record;
		this.onSelectionChange(e.grid.getSelectionModel(),[rec]);
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
		var jobsStore = rec.jobs();
		var grid = this.getJobsHistoryGrid();
        if (rec) {
            this.getDutyRosterForm().loadRecord(rec);
            //this store from a has many association is not configured with a proxy and so is not working with the paging toolbar
            jobsStore.setProxy({
            	type: 'ajax',
            	url:'php/engineering/staff/jobshisto.php',        
		        reader: {
		            type: 'json',
					messageProperty: 'msg',
					totalProperty: 'total',					
		            root: 'data'
		        },
            	extraParams: {
            		staff_id: rec.get('staff_id'),
            		limit: 10
            	}
            });
            //jobsStore.removeFilter('staff_id', false);
            grid.reconfigure(jobsStore, grid.cloneConfig().columns);
            grid.down('pagingtoolbar').bindStore(jobsStore);
        }
	}
});