Ext.define('Civic.view.security.Profile', {
	extend: 'Ext.window.Window',
	alias: 'widget.profile',

	height: 260,
	width: 550,

	requires: [
		'Civic.util.Util',
		'Ext.form.field.ComboBox'
	],

	layout: {
		type: 'fit'
	},
	title: 'User',

	items: [
		{
			xtype: 'form',
			bobyPadding: 5,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					flex: 2,
					title: 'User Information',
					defaults: {
						afterLabelTextTpl: Civic.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						allowBlank: false,
						labelWidth: 60
					},
					items: [
						{
							xtype: 'hiddenfield',
							fieldLabel: 'Label',
							name: 'id'
						},{
							fieldLabel: 'Username',
							name: 'username'
						},{
							fieldLabel: 'First Name',
							maxLength: 100,
							name: 'firstname'
						},{
							fieldLabel: 'Surname',
							maxLength: 100,
							name: 'lastname'
						},{
							fieldLabel: 'Email',
							maxLength: 100,
							name: 'email'
						},{
							xtype: 'combobox',
							fieldLabel: 'Group',
							name: 'groupid',
							displayField: 'name',
							valueField: 'id',
							queryMode: 'local',
							store: 'security.Groups'
						},{
							xtype: 'filefield',
							fieldLabel: 'Picture',
							name: 'picture',
							allowBlank: true,
							afterLabelTextTpl: ''
						}
					]
				},{
					xtype: 'fieldset',
					title: 'Picture',
					width: 170,
					items: [
						{
							xtype: 'image',
							height: 150,
							width: 150,
							src: ''
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					flex: 1,
					dock: 'bottom',
					ui: 'footer',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							text: 'Cancel',
							itemId: 'cancel',
							iconCls: 'cancel'
						},{
							xtype: 'button',
							text: 'Save',
							itemId: 'save',
							iconCls: 'save'
						}
					]
				}
			]
		}
	]
});