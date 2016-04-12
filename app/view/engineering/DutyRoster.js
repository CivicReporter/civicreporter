Ext.define('Civic.view.engineering.DutyRoster', {
	extend: 'Ext.form.Panel',
	alias: 'widget.engdutyroster',

	requires: [
		'Civic.view.civicr.AbstractRoster'
	],

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	initComponent: function () {
		Ext.apply(this, {
			items: [
				{
					xtype: 'abstractroster',
					flex: 1
				},{
					title: 'Staff details',
					xtype: 'form',
					frame: true,
					width: 300,
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
								name: 'status'								
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
				}
			]
		});

		this.callParent();
	}

	
});