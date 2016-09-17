Ext.define('Civic.view.engineering.CallWindow', {
	extend: 'Civic.view.civicr.WindowForm',
	alias: 'widget.callwindow',

	height: 480,
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
							fieldLabel: 'ID Number',
							maxLength: 15,
							name: 'nid',
							emptyText: 'XX-XXXXXX-X-XX'
						},{
							fieldLabel: 'Phone Number',
							maxLength: 12,
							name: 'phone',
							emptyText: 'XXX-XXXXXX'

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
							valueField: 'code_id',
							queryMode: 'local',
							store: 'staticData.FaultCodes'
						},{
							xtype: 'combobox',
							fieldLabel: 'Suburb',
							name: 'suburb',
							itemId: 'suburb',
							displayField: 'name',
							valueField: 'suburb_id',
							queryMode: 'local',
							store: 'staticData.Suburbs'
						},{
							xtype: 'combobox',
							fieldLabel: 'Street',
							name: 'street',
							itemId: 'street',
							displayField: 'name',
							//valueField: 'gid',
							queryMode: 'local',
							store: 'staticData.Roads',
							allowBlank: true,
							disabled: true,
							afterLabelTextTpl: '',
							emptyText: '--select street--'
						},{
							xtype: 'numberfield',
							fieldLabel: 'Stand Number',
							name: 'stand_no',
							minValue: 1
						},{
							xtype: 'numberfield',
							fieldLabel: 'Property Damage %',
							name: 'property_damage',
							maxValue: 100,
							minValue: 0,
							step: 10
						},{
							xtype: 'textareafield',
							fieldLabel: 'Description',
							name: 'description',
							maxLength: 1000,
							height: 100,
							allowBlank: true,
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