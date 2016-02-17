Ext.define('Civic.controller.security.Users', {
	extend: 'Ext.app.Controller',

	view: [
		'security.Users'
	],

	stores: [
		'security.Groups',
		'security.Users'
	],

	refs: [
		{
			ref: 'usersList',
			selector: 'userslist'
		},{
			ref: 'usersGrid',
			selector: 'users'
		},{
			ref: 'userPicture',
			selector: 'profile form image'
		}
	],
	
	init: function(application){
		this.control({
			'userslist': {
				render: this.onRender,
				selectionchange: this.onSelectionChange
			},

			'users button#add': {
				click: this.onButtonClickAdd
			},

			'users button#edit': {
				click: this.onButtonClickEdit
			},

			'users button#delete': {
				click: this.onButtonClickDelete
			},

			'users button#clearFilter': {
				click: this.onButtonClickClearFilter
			},

			'profile button#save': {
				click: this.onButtonClickSave
			},

			'profile button#cancel': {
				click: this.onButtonClickCancel
			},

			'profile filefield': {
				change: this.onFilefieldChange
			}
		});
	},

	onRender: function (component, options) {
		component.getStore().load();
		this.getSecurityGroupsStore().load();
	},

	onSelectionChange: function (selModel, selected, eOpts) {
		grid = this.getUsersGrid();

		if (selModel.hasSelection()) {
			
			grid.down('button#edit').enable();
			grid.down('button#delete').enable();
		} else{

			grid.down('button#edit').disable();
			grid.down('button#delete').disable();
		};
	},

	onButtonClickAdd: function (button, e, options) {
		var win = Ext.create('Civic.view.security.Profile');
		win.setTitle('Add New User');
		win.show();
	},

	onButtonClickEdit: function (button, e, options) {
		var grid = this.getUsersList();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			var editWindow = Ext.create('Civic.view.security.Profile');

			editWindow.down('form').loadRecord(record[0]);

			if (record[0].get('picture')) {
				var img = editWindow.down('image');
				img.setSrc('resources/profileImages/' + record[0].get('picture'));
			};

			editWindow.setTitle(record[0].get('name'));
			editWindow.show();
		};
	},

	onButtonClickDelete: function (button, e, options) {
		var grid = this.getUsersList();
		record = grid.getSelectionModel().getSelection();
		store = grid.getStore();

		if (store.getCount() >= 2 && record[0]) {
			Ext.Msg.show({
				title: 'Delete User?',
				msg: 'Are you sure you want to delete the selected user?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (buttonId) {
					if (buttonId == 'yes') {
						Ext.Ajax.request({
							url: 'php/security/deleteUser.php',
							params: {
								id: record[0].get('id')
							},
							success: function (conn, response, options, eOpts) {
								var result = Civic.util.Util.decodeJSON(conn.responseText);

								if (result.success) {
									Civic.util.Alert.msg('Success!', 'User deleted.');
									store.load();
								} else{
									Civic.util.Util.showErrorMsg(conn.responseText);
								};
							},
							failure: function (conn, response, options, eOpts) {
								Civic.util.Util.showErrorMsg(conn.responseText);
							}
						})
					};
				}
			});
		} else if (store.getCount() == 1) {
			Ext.Msg.show({
				title: 'Warning',
				msg: 'You cannot delete all the users from CivicReporter !',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.WARNING
			});
		};

	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('users').down('userslist').filters.clearFilters();
	},

	onButtonClickSave: function (button, e, options) {
		var win = button.up('window');
		formPanel = win.down('form');

		store = this.getUsersList().getStore();

		if (formPanel.getForm().isValid()) {
			formPanel.getForm().submit({
				clientValidation: true,
				url: 'php/security/saveUser.php',
				success: function (form, action) {
					var result = action.result;

					if (result.success) {
						Civic.util.Alert.msg('User saved successfully!');
						store.load();
						win.close()
					} else {
						Civic.util.Util.showErrorMsg(result.msg);
					};
				},
				failure: function (form, action) {
					switch (action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Failure', 'Invalid values submitted!');

							break;

						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Failure', 'Ajax communication failed.');

							break;

						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert('Failure', action.result.msg);

							break;
					}
				}
			})
		};
	},

	onButtonClickCancel: function (button, e, options) {
		button.up('window').close();
	},

	onFilefieldChange: function (filefield, value, options) {
		var file = filefield.fileInputEl.dom.files[0];

		var picture = this.getUserPicture();

		if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
			var reader = new FileReader();
			reader.onload = function (e) {
				picture.setSrc(e.target.result);
			};
			reader.readAsDataURL(file);
		} else if (!(/image/i).test(file.type)) {
			Ext.Msg.alert('Warning', 'You can only upload image files!');
			filefield.reset();
		};
	}
});