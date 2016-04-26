Ext.define('Civic.view.engineering.CallWindow', {
	extend: 'Civic.view.civicr.WindowForm',
	alias: 'widget.callwindow',

	height: 470,
	width: 400,

	requires: [
		'Civic.util.Util',
		'Ext.form.field.ComboBox'
	],

	layout: {
		type: 'fit'
	},
	title: 'Report New Fault',

	items: [
		{
			xtype: 'form',
			bodyPadding: 5,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					title: 'Caller Details',
					defaults: {
						afterLabelTextTpl: Civic.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						allowBlank: false,
						labelWidth: 120
					},
					items: [
						{
							fieldLabel: 'First Name',
							maxLength: 100,
							name: 'firstname',
							allowBlank: true,
							afterLabelTextTpl: ''
						},{
							fieldLabel: 'Last Name',
							maxLength: 100,
							name: 'lastname'
						},{
							fieldLabel: 'Phone Number',
							maxLength: 100,
							name: 'phone'
						}
					]
				},{
					xtype: 'fieldset',
					title: 'Fault Details',
					defaults: {
						afterLabelTextTpl: Civic.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						allowBlank: false,
						labelWidth: 120
					},
					items: [
						{
							xtype: 'hiddenfield',
							fieldLabel: 'Call Id',
							name: 'call_id'
						},{
							xtype: 'hiddenfield',
							fieldLabel: 'Caller Id',
							name: 'caller_id'
						},{
							xtype: 'combobox',
							fieldLabel: 'Fault Code',
							name: 'code',
							displayField: 'description',
							valueField: 'code',
							queryMode: 'local',
							store: 'staticData.FaultCodes'
						},{
							xtype: 'combobox',
							fieldLabel: 'Suburb',
							name: 'suburb',
							displayField: 'name',
							valueField: 'name',
							queryMode: 'local',
							store: 'staticData.Suburbs'
						},{
							xtype: 'combobox',
							fieldLabel: 'Street',
							name: 'street',
							displayField: 'street',
							valueField: 'street',
							queryMode: 'local',
							store: 'staticData.FaultCodes',
							allowBlank: true,
							afterLabelTextTpl: ''
						},{
							xtype: 'numberfield',
							fieldLabel: 'Stand Number',
							name: 'stand_no',
							minValue: 1
						},{
							xtype: 'numberfield',
							fieldLabel: 'Severity',
							name: 'severity',
							maxValue: 5,
							minValue: 1,
							step: 1
						},{
							xtype: 'textareafield',
							fieldLabel: 'Description',
							name: 'description',
							maxLength: 5000,
							height: 100,
							allowBlank: true,
							afterLabelTextTpl: ''
						},{
							xtype: 'checkboxfield',
							fieldLabel: 'Property Damage',
							name: 'property_damage',
							inputValue: 't',
							afterLabelTextTpl: ''
						}
					]
				}
			]
		}
	],

	dockedItems: [
		{
			xtype: 'cancelsave'			
		}
	]
});