Ext.define('Civic.view.engineering.JobWindow', {
	extend: 'Civic.view.civicr.WindowForm',
	alias: 'widget.jobwindow',

	height: 300,
	width: 450,

	requires: [
		'Civic.util.Util',
		'Ext.form.field.ComboBox',
		'Civic.view.engineering.JobCalls'
	],

	layout: {
		type: 'fit'
	},
	title: 'Create New Job',

	items: [
		{
			xtype: 'form',
			bobyPadding: 5,
			layout: {
				type: 'fit'
			},
			items: [
				{
					xtype: 'tabpanel',
					activeTab: 0,
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
								type: 'anchor'
							},
							title: 'Assignment Details'
						},{
							xtype: 'panel',
							layout: {
								type: 'anchor'
							},
							title: 'Job Summary',
							bodyPadding: 15,
							defaults: {
								anchor: '100%',
								xtype: 'textfield',
								readOnly: true,
								labelWidth: 100
							},
							items: [
								{
									fieldLabel: 'Job Id',
									name: 'job_id'
								},{
									fieldLabel: 'Suburb',
									name: 'suburb'
								},{
									xtype: 'combobox',
									fieldLabel: 'Status',
									name: 'status',
									displayField: 'text',
									valueField: 'text',
									queryMode: 'local',
									store: 'staticData.Status',
									value: 'OPEN',
									readOnly: true
								},{
									xtype: 'datefield',
									fieldLabel: 'Opened On',
									name: 'opened_on',
									value: new Date(),
									format: 'j M Y H:i:s'
								},{
									fieldLabel: 'Opened By',
									name: 'opened_by',
									value: user //the user variable from the login controller 
								},{
									xtype: 'datefield',
									fieldLabel: 'Closed On',
									name: 'closed_on'
								},{
									fieldLabel: 'Closed By',
									name: 'closed_by'
								}
							]
						}
					]					
				}
			]
		}
	]
});