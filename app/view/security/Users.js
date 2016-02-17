Ext.define('Civic.view.security.Users', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.users',

	requires: [
		'Civic.view.security.UsersList',
		'Civic.view.toolbar.AddEditDeleteFilter'
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
			xtype: 'addeditdeletefilter'
		}
	]
});