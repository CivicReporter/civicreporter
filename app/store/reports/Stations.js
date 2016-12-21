Ext.define('Civic.store.reports.Stations', {
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
		url: 'php/reports/sewer.php',
		extraParams: {
			query: 'stations'
		},
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});