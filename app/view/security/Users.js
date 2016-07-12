Ext.define('Civic.view.security.Users', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.users',

	requires: [
		'Civic.view.security.UsersList'
	],

	layout: {
		type: 'fit'
	},

	items: [
		{
			xtype: 'userslist'
		}	
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			itemId: 'topToolbar',
			items: [
				{
			/*		xtype: 'button',
					text: 'New',
					itemId: 'add',
					iconCls: 'add',
					tooltip: 'Create new user'
				},{
			*/		xtype: 'button',
					text: 'Edit',
					itemId: 'edit',
					disabled: true,
					iconCls: 'edit',
					tooltip: 'Edit selected user'
				},{
					xtype: 'button',
					text: 'Delete',
					itemId: 'delete',
					disabled: true,
					iconCls: 'delete',
					tooltip: 'Delete selected user'
				},{
					xtype: 'tbseparator'
				},{
					xtype: 'button',
					itemId: 'clearFilter',
					text: 'Clear Filters',
					iconCls: 'clear_filter'
				},{
					xtype: 'button',
					itemId: 'refresh',
					text: 'Refresh View',
					iconCls: 'refresh_view'
				}
			]
		}
	]
});