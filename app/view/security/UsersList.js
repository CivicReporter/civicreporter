Ext.define('Civic.view.security.UsersList', {
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias: 'widget.userslist',

	requires: [
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	store: 'security.Users',
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
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			width: 80,
			dataIndex: 'username',
			text: 'Username',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			width: 100,
			dataIndex: 'firstname',
			text: 'First Name',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			width: 150,
			dataIndex: 'lastname',
			text: 'Surname',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			width: 240,
			dataIndex: 'email',
			flex: 1,
			text: 'Email',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
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

				return group ? Civic.util.Util.renderActive(group.get('name'), metaData, record): '';
			}
		},{
			width: 80,
			dataIndex: 'active',
			text: 'Status',
			filter: {
				type: 'string'
			},
			renderer: function(value, metaData, record){
				var val;

				if (value == 't'){
					return Civic.util.Util.renderActive('ACTIVE', metaData, record);
				} else {
					return Civic.util.Util.renderActive('INACTIVE', metaData, record);
				}
			}
		},{
			xtype: 'datecolumn',
			text: 'Created On',
			width: 140,
			dataIndex: 'created_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			xtype: 'datecolumn',
			text: 'Last Update',
			width: 140,
			dataIndex: 'last_update',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}

		},{
			xtype: 'actioncolumn',
			width: 30,
			align: 'center',
			sortable: false,
			menuDisabled: true,
			items: [
				{
					handler: function (view, rowIndex, colIndex, item, e, record, row) {
						this.fireEvent('itemclick', this, 'delete', view, e, record);
					},
					iconCls: 'delete',
					tooltip: 'Delete'
				}
			]
		}
	]
});