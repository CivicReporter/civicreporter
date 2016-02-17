Ext.define('Civic.controller.login.Login', {
	extend: 'Ext.app.Controller',

	requires: [
		'Civic.util.Util'
	],
	
	views: [
		'login.Login',
		'authentication.CapsLockTooltip',
		'Header'
	],

	stores: [
		'security.Users'
	],

	refs: [
		{
			ref: 'capslockTooltip',
			selector: 'capslocktooltip'
		},{
			ref: 'loginForm',
			selector: 'login form'
		}
	],
	
	init: function(application){
		this.control({
			'login form button#submit': {
				click: this.onButtonClickSubmit
			},
			'login form button#cancel': {
				click: this.onButtonClickCancel
			},
			'login form textfield': {
				specialkey: this.onTextfieldSpecialKey
			},
			'login form textfield[name=password]': {
				keypress: this.onTextfieldKeyPress
			},
			'appheader': {
				beforerender: this.onToolbarBeforeRender
			},
			'appheader button#logout': {
				click: this.onButtonClickLogout
			}
		});
	},
	
	onButtonClickCancel: function(button, e, options) {
		button.up('form').getForm().reset();
	},
	
	onButtonClickSubmit: function(button, e, options) {
		var formPanel = button.up('form');
		login = button.up('login');
		user = formPanel.down('textfield[name=user]').getValue();
		pass = formPanel.down('textfield[name=password]').getValue();
		if (formPanel.getForm().isValid()) {
			login.getEl().mask('Authenticating...Please Wait...', 'loading');
			Ext.Ajax.request({
				url: 'php/login/login.php',
				params: {
					user: user,
					password: pass
				},
				failure: function (conn, response, options, eOpts){
					Ext.get(login.getEl()).unmask();
					Civic.util.Util.showErrorMsg(conn.responseText);
				}, 
				success: function (conn, response, options, eOpts){
					login.getEl().unmask();
					var result = Civic.util.Util.decodeJSON(conn.responseText);

					if (result.success) {
						login.close();
						Ext.widget('mainviewport');
					} else{
						Ext.Msg.show({
							title: 'Fail',
							msg: result.msg,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					};
				
				}
			})
		};
	},

	onTextfieldSpecialKey: function(field, e, options){
		if (e.getKey()==e.ENTER) {
			var submitBtn = field.up('form').down('button#submit');
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},

	onTextfieldKeyPress: function (field, e, options) {
		var charCode = e.getCharCode();
		if ((e.shiftKey && charCode >= 97 && charCode <= 122)||(!e.shiftKey && charCode >= 65 && charCode <= 90)) {
			if (this.getCapslockTooltip() == undefined) {
				Ext.widget('capslocktooltip');
			}
			this.getCapslockTooltip().show();
		} else{
			if (this.getCapslockTooltip() !== undefined) {
				this.getCapslockTooltip().hide();
			};
		};
	},

	onToolbarBeforeRender: function (toolbar, eOpts) {
		user = this.getLoginForm().down('textfield[name=user]').getValue();

		toolbar.add(
			{
				xtype: 'label',
				html: '<div id="titleHeader"><span style="font-size: 10px;">You are logged in as <span id="appuser">'+user+'</span></span></div>'
			},{
				xtype: 'tbseparator'
			},{
				xtype: 'button',
				text: 'Logout',
				itemId: 'logout',
				iconCls: 'logout'
			}
		);
	},

	onButtonClickLogout: function (button, e, options) {
		Ext.Ajax.request({
			url: 'php/login/logout.php',
			success: function (conn, response, options, eOpts){
				var result = Civic.util.Util.decodeJSON(conn.responseText);

				if (result.success) {
					button.up('mainviewport').destroy();
					window.location.reload();
				} else{
					Civic.util.Util.showErrorMsg(conn.responseText);
				};
			},
			failure: function (conn, response, options, eOpts) {
				Civic.util.Util.showErrorMsg(conn.responseText);
			}
		});
	}
});