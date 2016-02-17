Ext.define('Civic.model.staticData.Caller', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'caller_id',

	fields: [
		{
			name: 'caller_id',
			type: 'int'
		},{
			name: 'firstname'
		},{
			name: 'surname'
		},{
			name: 'phone'
		}
	]
});