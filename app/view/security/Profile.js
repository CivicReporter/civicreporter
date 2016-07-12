Ext.define('Civic.view.security.Profile', {
	extend: 'Ext.window.Window',
	alias: 'widget.profile',

	title: 'User Profile',
	iconCls: 'menu_users',
	height: 320,
	width: 700,
	draggable: false,
	resizable: false,

	requires: [
		'Civic.util.Util',
		'Ext.form.field.*'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'form',
			bodyPadding: 5,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					itemId: 'userinfo',
					flex: 2,
					title: 'User Information',
					autoScroll: true,
					defaults: {
						afterLabelTextTpl: Civic.util.Util.required,
						anchor: '100%',
						xtype: 'textfield',
						vtype: 'alphanum',
						allowBlank: false,
						labelWidth: 120,
						msgTarget: 'under',
						padding: '0 25 0 0'
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
							name: 'firstname',
							vtype: 'alpha'
						},{
							fieldLabel: 'Surname',
							maxLength: 100,
							name: 'lastname',
							vtype: 'alpha'
						},{
							fieldLabel: 'Email',
							maxLength: 100,
							name: 'email',
							vtype: 'email'
						},{
							xtype: 'combobox',
							fieldLabel: 'Group',
							name: 'groupid',
							displayField: 'name',
							valueField: 'id',
							queryMode: 'local',
							store: 'security.Groups'
						},{
							xtype: 'combobox',
							fieldLabel: 'Status',
							name: 'active',
							displayField: 'name',
							valueField: 'int',
							queryMode: 'local',
							store: 'staticData.ActiveStatus'
						},{
							xtype: 'filefield',
							fieldLabel: 'Picture',
							name: 'picture',
							allowBlank: true,
            				emptyText: 'Select an image',
							afterLabelTextTpl: '',
							buttonText: 'Browse',
				            buttonConfig: {
				                iconCls: 'upload'
				            }
						},{
							fieldLabel: 'Password',
							inputType: 'password',
							vtype: 'customPass',
							maxLength: 15,
							name: 'password',
							disabled: true
						},{
							fieldLabel: 'Re-Type Password',
							inputType: 'password',
							vtype: 'customPass',
							maxLength: 15,
							name: 'password2',
							disabled: true
						}
					]
				},{
					xtype: 'fieldset',
					title: 'Picture',
					width: 200,
					layout: {
						type: 'fit'
					},
					items: [
						{
							xtype: 'image',
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
							iconCls: 'save',
							formBind: true
						}
					]
				}
			]
		}
	]
});