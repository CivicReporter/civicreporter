Ext.define('Civic.controller.security.Users', {
	extend: 'Ext.app.Controller',

	view: [
		'security.Users',
		'security.Profile'
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
		/*
			'users button#add': {
				click: this.onButtonClickAdd
			},
		*/
			'users button#edit': {
				click: this.onButtonClickEdit
			},

			'users button#delete': {
				click: this.onButtonClickDelete
			},

			'users button#clearFilter': {
				click: this.onButtonClickClearFilter
			},
			'users button#refresh': {
				click: this.onButtonClickRefresh
			},
			'userslist actioncolumn': {
				itemclick: this.handleActionColumn
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

		this.listen({
			store: {
				'#security.Users': {
					write: this.onStoreSync,
					update: this.onStoreSync
				}
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
		var win = Ext.widget('profile');
		win.setTitle('Add New User');
		win.show();
	},

	onButtonClickEdit: function (button, e, options) {
		var grid = this.getUsersList();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			var editWindow = Ext.widget('profile');
			form = editWindow.down('form');

			form.loadRecord(record[0]);
			form.getComponent('userinfo').items.items.forEach(function (field) {
				if (field.xtype == 'textfield') {
					field.setReadOnly(true);					
				};
				if (field.xtype == 'filefield' || field.inputType == 'password') {
					field.setVisible(false);					
				};
			});

			if (record[0].get('picture')) {
				var img = editWindow.down('image');
				img.setSrc('resources/profileImages/' + record[0].get('picture'));
			};

			editWindow.setTitle(record[0].get('firstname')+' '+record[0].get('lastname'));
			editWindow.show();
		};
	},

	onButtonClickDelete: function (button, e, options) {
		var grid = this.getUsersList();
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {
			this.handleActionColumn(grid.down('actioncolumn'), 'delete', grid.getView(), e, record[0]);				
		}

	},

	onButtonClickClearFilter: function (button, e, options) {
		button.up('users').down('userslist').filters.clearFilters();
	},

	onButtonClickRefresh: function (button, e, options) {
		button.up('users').down('userslist').getStore().reload();
	},

	handleActionColumn: function (column, action, view, e, record) {
		if (action == 'delete') {
			var grid = this.getUsersList();
			store = grid.getStore();

			if (store.getCount() >= 2 && record) {
				Ext.Msg.show({
					title: 'DELETE USER?',
					msg: 'Are you sure you want to delete the selected user?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (buttonId) {
						if (buttonId == 'yes') {
							if (record.get('username') == user) {
								Ext.Msg.show({
									title: 'RESTRICTED ACTION',
									msg: 'You cannot delete a currently logged user!',
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.WARNING
								});
							} else{
								Ext.get(Ext.getBody()).mask('Deleting...Please Wait...', 'loading');
								store.remove(record);
							};							
						};
					}
				});
			} else if (store.getCount() == 1) {
				Ext.Msg.show({
					title: 'RESTRICTED ACTION',
					msg: 'You cannot delete all the users from CivicReporter!',
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.WARNING
				});
			};

		};
	},

	onButtonClickSave: function (button, e, options) {
		var win = button.up('window');
		form = win.down('form').getForm();

		store = Ext.getStore('security.Users');

		if (form.isValid()) {

			if (form.getRecord()) {
				
				Ext.get(Ext.getBody()).mask('Saving...Please Wait...', 'loading');
				
				form.updateRecord();

			} else{

				values = form.getFieldValues({
					dirtyOnly: true
				});

				if (values.password == values.password2) {

					Ext.get(Ext.getBody()).mask('Saving...Please Wait...', 'loading');

					record = Ext.create('Civic.model.security.User', form.getFieldValues({
						dirtyOnly: true
					}));

					store.add(record);

				} else{

					form.findField('password2').markInvalid('passwords do not match');
				};
			
			};

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
	},

	onStoreSync: function (store, operation) {	
		win = Ext.ComponentQuery.query('profile')[0];
		if (win) {
			win.close();	
		};
		
		Ext.get(Ext.getBody()).unmask();

		switch (operation.action) {
			case 'create':
				Ext.MessageBox.show({
					title: 'CREATE SUCCESSFUL',
					msg: 'New User profile created!</br>'+'Contact administrator to get activated.',
					icon: Ext.MessageBox.INFO,
					buttons: Ext.Msg.OK
				});
				break;
			case 'update':
				Ext.MessageBox.show({
					title: 'UPDATE SUCCESSFUL',
					msg: 'User details updated!',
					icon: Ext.MessageBox.INFO,
					buttons: Ext.Msg.OK
				});
				break;
			case 'destroy':
				Ext.MessageBox.show({
					title: 'DELETE SUCCESSFUL',
					msg: 'User deleted!',
					icon: Ext.MessageBox.INFO,
					buttons: Ext.Msg.OK
				});
				break;
		};			
	}
});