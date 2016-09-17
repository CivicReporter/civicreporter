Ext.define('Civic.view.engineering.JobWindow', {
	extend: 'Civic.view.civicr.WindowForm',
	alias: 'widget.jobwindow',

	height: 330,
	width: 550,

	requires: [
		'Civic.util.Util',
		'Ext.form.field.ComboBox',
		'Civic.view.engineering.JobCalls',
		'Civic.view.engineering.JobStaff'
	],

	layout: {
		type: 'fit'
	},
	title: 'Create New Job',
	iconCls: 'add',

	items: [
		{
			xtype: 'form',
			bobyPadding: 5,
			layout: {
				type: 'card'
			},
			items: [
				{
					xtype: 'panel',
					layout: {
						type: 'fit'
					},
					title: 'Linked Faults',
					items: [
						{
							xtype: 'engjobcalls'
						}
					]
				},{
					xtype: 'panel',
					layout: {
						type: 'fit'
					},
					title: 'Attending Technicians',
					items: [
						{
							xtype: 'engjobstaff'
						}
					]
				},{
					xtype: 'panel',
					layout: {
						type: 'table',
						columns: 2
					},
					title: 'Job Summary',
					bodyPadding: '15 100 15 20',
					frame: true,
					defaults: {
						xtype: 'textfield',
						width: 400,
						readOnly: true,
						labelWidth: 100
					},
					items: [
						{
							fieldLabel: 'Job Id',
							name: 'job_id',
							allowBlank: false,
							colspan: 2
						},{
							xtype: 'combobox',
							fieldLabel: 'Suburb',
							name: 'suburb',
							itemId: 'suburb',
							displayField: 'name',
							valueField: 'suburb_id',
							queryMode: 'local',
							store: 'staticData.Suburbs',
							allowBlank: false,
							colspan: 2
						},{
							xtype: 'textfield',
							fieldLabel: 'Coordinates',
							name: 'coordinates',
							allowBlank: false,
							width: 320,
							colspan: 1
						},{
							xtype: 'button',
							text: 'Select',
							itemId: 'point',
							iconCls: 'point',
							width: 60
									
						},{
							fieldLabel: 'Status',
							name: 'status',
							allowBlank: false,
							colspan: 2
						},{
							xtype: 'combobox',
							fieldLabel: 'Station Assigned',
							name: 'station',
							itemId: 'station',
							displayField: 'name',
							valueField: 'station_id',
							queryMode: 'local',
							store: 'staticData.Stations',
							allowBlank: true,
							emptyText: 'UNASSIGNED',
							colspan: 2
						},{
							xtype: 'datefield',
							fieldLabel: 'Opened On',
							name: 'opened_on',
							value: new Date(),
							format: 'j M Y H:i:s',
							allowBlank: false,
							colspan: 2
						},{
							fieldLabel: 'Opened By',
							name: 'opened_by',
							value: user, //the user variable from the login controller
							allowBlank: false,
							colspan: 2 
						},{
							xtype: 'datefield',
							fieldLabel: 'Closed On',
							name: 'closed_on',
							hidden: true,
							colspan: 2
						},{
							fieldLabel: 'Closed By',
							name: 'closed_by',
							hidden: true,
							colspan: 2
						}
					]
				}
			],

			dockedItems: [
				{
					xtype: 'backnextcancelsave'			
				}
			]
		}
	]
});