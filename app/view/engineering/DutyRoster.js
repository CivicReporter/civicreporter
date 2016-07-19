Ext.define('Civic.view.engineering.DutyRoster', {
	extend: 'Ext.form.Panel',
	alias: 'widget.engdutyroster',

	requires: [
		'Civic.view.civicr.AbstractRoster',
		'Civic.view.engineering.JobsHistory',
		'Ext.form.RadioGroup'
	],

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	initComponent: function () {
		Ext.apply(this, {
			items: [
				{
					xtype: 'panel',
					layout: {
						type: 'table',
						columns: 4
					},
					width: '100%',
					height: '100%',
					items: [
						{
							xtype: 'abstractroster',
							colspan: 2,
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
						}/*,{
							title: 'Staff details',
							xtype: 'form',
							frame: true,
							//colspan: 1,
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
							collapsible: true,
							collapseDirection: 'bottom',
							collapsed: false
						}*/
					]
				}
			]
		});

		this.callParent();
	}

	
});