Ext.define('Civic.model.dashboard.Suburb', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'suburb_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'station'
		},{
			name: 'open',
			type: 'int'
		},{
			name: 'pending',
			type: 'int'
		},{
			name: 'completed',
			type: 'int'
		},{
			name: 'total',
			type: 'int'
		}
	]
});