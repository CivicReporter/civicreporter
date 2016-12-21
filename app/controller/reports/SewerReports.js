Ext.define('Civic.controller.reports.SewerReports', {
	extend: 'Ext.app.Controller',

	requires: [
		
	],

	views: [
		'civicr.ReportsPanel'
	],

	stores: [
		'reports.SuburbGroups',
		'reports.Stations'
	],

	refs: [
		{
			ref: 'summaryGrid',
			selector: 'suburbsummary'
		}
	],
	
	init: function(application){
		this.control({
			'suburbsummary': {
				render: this.onPanelRender
			},
			'form button#clear'	: {
				click: this.onButtonClickClear
			},
			'form button#search'	: {
				click: this.onButtonClickSearch
			},
			'form datefield#from_date': {
				select: this.onDateSelect
			}			
		});
	},

	onPanelRender: function (component, options) {
		//component.getStore().load();
		this.getReportsStationsStore().load();
	},

	onButtonClickClear: function (button, e, options) {
		var form = button.up('form'),
			toDate = form.down('datefield#to_date');
		
		if (!toDate.isDisabled()) {
			toDate.disable();
		};
		form.getForm().reset();
	},

	onButtonClickSearch: function (button, e, options) {
		var me = this,
			form = button.up('form'),
			grid = me.getSummaryGrid();
		
		Ext.get(grid.getEl()).mask('Searching...Please Wait...', 'loading');
		form.getForm().submit({
			clientValidation: true,
			url: 'php/reports/sewer.php',
			params: {
				query: 'suburbs'
			},
			success: function (form, action) {
				Ext.get(grid.getEl()).unmask();
				var result = action.result,
					values = form.getFieldValues({dirtyOnly: true});

				if (result.success) {
					grid.getStore().loadData(result.data, false);
					grid.up('panel').setTitle('FAULT ATTENDANCE REPORT BY CATCHMENT AREA FOR THE PERIOD '+Ext.Date.format(values.from_date, 'd F, Y')+' TO '+Ext.Date.format(values.to_date, 'd F, Y'));
				} else {
					Civic.util.Util.showErrorMsg(result.msg);
				};
			},
			failure: function (form, action) {
				Ext.get(grid.getEl()).unmask();
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
		form.getForm().submit({
			clientValidation: true,
			url: 'php/reports/sewer.php',
			params: {
				query: 'stations'
			},
			success: function (form, action) {
				var result = action.result;

				if (result.success) {
					me.getReportsStationsStore().loadData(result.data, false);
				} else {
					Civic.util.Util.showErrorMsg(result.msg);
				};
			},
			failure: function (form, action) {
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

	onDateSelect: function (field, value, eOpts) {
		var toDate = field.up('form').down('datefield#to_date');
		
		toDate.setMinValue(value);
		toDate.setValue(new Date());
		toDate.enable();
	}
});