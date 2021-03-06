Ext.define('Civic.model.public.AbstractCall', {
	extend: 'Civic.model.public.AbstractDate',

	fields: [
		{
			name: 'call_id',
			type: 'int'
		},{
			name: 'code_id',
			type: 'int'
		},{
			name: 'caller',
			type: 'string'
		},{
			name: 'nid'
		},{
			name: 'caller_id',
			type: 'int'
		},{
			name: 'stand_no'
		},{
			name: 'street'
		},{
			name: 'suburb_id',
			type: 'int'
		},{
			name: 'status'
		},{
			name: 'reported_on',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},{
			name: 'description'
		},{
			name: 'job_id',
			type: 'int'
		}
	]
});