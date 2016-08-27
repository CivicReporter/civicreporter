Ext.define('Civic.model.dashboard.Station', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'station_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'open_calls',
			type: 'int'
		},{
			name: 'pending_calls',
			type: 'int'
		},{
			name: 'closed_calls',
			type: 'int'
		},{
			name: 'total_calls',
			type: 'int'
		},{
			name: 'hr24'
		},{
			name: 'hr48'
		},{
			name: 'hr72'
		},{
			name: 'hr96'
		}
	]
});