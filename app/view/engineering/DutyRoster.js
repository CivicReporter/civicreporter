Ext.define('Civic.view.engineering.DutyRoster', {
	extend: 'Ext.form.Panel',
	alias: 'widget.engdutyroster',

	requires: [
		'Civic.view.civicr.AbstractRoster',
		'Civic.view.engineering.JobsHistory',
		'Ext.form.RadioGroup'
	],

	initComponent: function () {
		Ext.apply(this, {
			items: [
				{
					xtype: 'panel',
					layout: {
						type: 'table',
						columns: 4,
						rows: 3
					},
					width: '100%',
					height: 615,
					items: [
						{
							xtype: 'abstractroster',
							width: 880,
							height: 315,
							colspan: 3,
							store: 'engineering.ActiveStaff',
							columns: [
								{
									text: 'Staff Id',
									width: 80,
									dataIndex: 'staff_id',
									filter: {
										type: 'numeric'
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									text: 'First Name',
									dataIndex: 'firstname',
									filter: {
										type: 'string'
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									text: 'Last Name',
									flex: 1,
									dataIndex: 'surname',
									filter: {
										type: 'string'
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									text: 'Call Sign',
									width: 80,
									dataIndex: 'call_sign',
									filter: {
										type: 'numeric'
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									text: 'Phone',
									dataIndex: 'phone',
									filter: {
										type: 'string'
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									text: 'Status',
									dataIndex: 'status',
									width: 90,
									editor: {
										xtype: 'combobox',
										store: 'engineering.StaffStatus',
										displayField: 'text',
										queryMode: 'local',
										allowBlank: false,
										maxLength: 45
									},
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}
								},{
									xtype: 'datecolumn',
									text: 'Last Update',
									width: 140,
									dataIndex: 'last_update',
									format: 'Y-m-d H:i:s',
									filter: true,
									renderer: function (value, metaData, record) {
										 return Civic.util.Util.renderText(value, metaData, record);
									}

								}
							]
						},{
							title: 'Staff details',
							xtype: 'form',
							frame: true,
							width: 300,
							height: 615,
							rowspan: 3,
							bodyPadding: '25 0 0 5',
							layout: 'anchor',
							defaults: {
								anchor: '100%',
								xtype: 'textfield',
								readOnly: true,
								labelWidth: 80
							},
							items: [
								{
									fieldLabel: 'Staff Id',
									name: 'staff_id'
								},{
									fieldLabel: 'First Name',
									name: 'firstname'
								},{
									fieldLabel: 'Last Name',
									name: 'surname'
								},{
									fieldLabel: 'Call Sign',
									name: 'call_sign'
								},{
									fieldLabel: 'Phone',
									name: 'phone'
								},{
									fieldLabel: 'Section',
									name: 'section_id'
								},{
									fieldLabel: 'Station',
									name: 'station_id'
								},{
									fieldLabel: 'Role',
									name: 'role'
								},{
									xtype: 'radiogroup',
									fieldLabel: 'Status',
									columns: 2,
									defaults: {
										name: 'status',
										readOnly: true								
									},
									items: [
										{
											inputValue: 'AVAILABLE',
											boxLabel: 'AVAILABLE'
										},{
											inputValue: 'BUSY',
											boxLabel: 'BUSY'
										},{
											inputValue: 'OFF DUTY',
											boxLabel: 'OFF DUTY'
										},{
											inputValue: 'STANDBY',
											boxLabel: 'STANDBY'
										}
									]

								}
							]
						},{
							xtype: 'engjobshistory',
							title: 'Jobs List',
							iconCls: 'menu_jobs',
							colspan: 3,
							height: 300,
							//store: 'engineering.Jobs',	
							dockedItems: [
								{
									dock: 'bottom',
									xtype: 'pagingtoolbar',
									displayInfo: true,
									displayMsg: 'Displaying Jobs {0} - {1} of {2}'
								}
							]
						}
					]
				}
			]
		});

		this.callParent();
	}

	
});