Ext.define('Civic.view.security.UsersList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.userslist',

	requires: [
		'Ext.ux.grid.FiltersFeature'
	],

	frame: false,
	store: Ext.create('Civic.store.security.Users'),

	features: [
		{
			ftype: 'filters',
			local: true
		}
	],

	columns: [
		{
			width: 80,
			dataIndex: 'id',
			text: 'User ID',
			filter: {
				type: 'numeric'
			}
		},{
			width: 100,
			dataIndex: 'username',
			text: 'Username',
			filter: {
				type: 'string'
			}
		},{
			width: 150,
			dataIndex: 'firstname',
			text: 'First Name',
			filter: {
				type: 'string'
			}
		},{
			width: 200,
			dataIndex: 'lastname',
			text: 'Surname',
			filter: {
				type: 'string'
			}
		},{
			width: 240,
			dataIndex: 'email',
			flex: 1,
			text: 'Email',
			filter: {
				type: 'string'
			}
		},{
			width: 100,
			dataIndex: 'groupid',
			text: 'Group',
			filter: {
				type: 'numeric'
			},
			renderer: function(value, metaData, record){
				var groupsStore = Ext.getStore('security.Groups');
				var group = groupsStore.findRecord('id', value);

				return group != null ? group.get('name'): value;
			}
		},{
			width: 110,
			dataIndex: 'active',
			text: 'Status',
			filter: {
				type: 'string'
			},
			renderer: function(value, metaData, record){
				return value == 't' ? 'Active':'Inactive';
			}
		},{
			xtype: 'datecolumn',
			text: 'Created On',
			width: 120,
			dataIndex: 'created_on',
			format: 'Y-m-d H:i:s',
			filter: true
		},{
			xtype: 'datecolumn',
			text: 'Last Update',
			width: 120,
			dataIndex: 'last_update',
			format: 'Y-m-d H:i:s',
			filter: true
		}
	]
});