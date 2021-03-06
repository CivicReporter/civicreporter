Ext.define('Civic.store.dashboard.Stations', {
	extend: 'Ext.data.Store',

	fields: [
		{
			name: 'name'
		},{
			name: 'catch_id'
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

	proxy: {
		type: 'ajax',
		url: 'php/dashboard/sewer.php',
		extraParams: {
			query: 'stations'
		},
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});