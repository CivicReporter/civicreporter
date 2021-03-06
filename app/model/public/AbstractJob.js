Ext.define('Civic.model.public.AbstractJob', {
	extend: 'Civic.model.public.AbstractDate',

	fields: [
		{
			name: 'job_id',
			type: 'int'
		},{
			name: 'code_id',
			type: 'int'
		},{
			name: 'suburb',
			type: 'string'
		},{
			name: 'station',
			type: 'string'
		},{
			name: 'status',
			type: 'string'
		},{
			name: 'opened_by'
		},{
			name: 'opened_on',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},{
			name: 'closed_by'
		},{
			name: 'closed_on',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},{
			name: 'assigned_on',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},{
			name: 'time_taken'/*,
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'*/
		}
	]
}); 