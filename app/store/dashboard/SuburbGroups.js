Ext.define('Civic.store.dashboard.SuburbGroups', {
	extend: 'Ext.data.Store',

	fields: [
		{
			name: 'suburb_id'
		},{
			name: 'name'
		},{
			name: 'sewer_catch_id'
		},{
			name: 'carried',
			type: 'int'
		},{
			name: 'received',
			type: 'int'
		},{
			name: 'completed',
			type: 'int'
		},{
			name: 'pending',
			type: 'int'
		}
	],

	sorters: {property: 'completed', direction: 'DESC'},
	groupField: 'sewer_catch_id',

	proxy: {
		type: 'ajax',
		url: 'php/dashboard/sewer.php',
		extraParams: {
			query: 'suburbs'
		},
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});