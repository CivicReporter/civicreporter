Ext.define('Civic.view.login.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.login',

	requires: [
		'Ext.form.Label'
	],

	autoShow: true,
	height: 200,
	width: 360,
	layout: {
		type: 'fit'
	},

	iconCls: 'key',
	title: 'Login',
	closeAction: 'hide',
	closable: false,
	draggable: false,
	resizable: false,
	items:[
		{
			xtype: 'form',
			frame: false,
			bodyPadding: 15,
			defaults:{
				xtype: 'textfield',
				anchor:'100%',
				labelWidth: 60,
				allowBlank: false,
				vtype: 'alphanum',
				msgTarget: 'under'
			},
			items:[
				{
					name: 'user',
					fieldLabel: 'User',
					minLength: 4,
					maxLength: 25,
					value: 'reason'
				},{
					inputType: 'password',
					name: 'password',
					fieldLabel: 'Password',
					vtype: 'customPass',
					maxLength: 15,
					id: 'password',
					enableKeyEvents: true,
					value: 'MyPassword#15'
				}
			],
			dockedItems:[
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items:[
						{
							xtype: 'button',
							itemId: 'new',
							iconCls: '',
							text: 'Sign Up'
						},{
							xtype: 'tbfill'
						},{
							xtype: 'button',
							itemId: 'cancel',
							iconCls: 'cancel',
							text: 'Cancel'
						},{
							xtype: 'button',
							itemId: 'submit',
							formBind: true,
							iconCls: 'key-go',
							text: 'Login'
						}
					]
					
				}
			]
		}
	]
});



