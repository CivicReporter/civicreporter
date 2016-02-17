Ext.define('Civic.model.staticData.FaultCodes', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'code_id',

	fields: [
		{
			name: 'code_id',
			type: 'int'
		},{
			name: 'section_id',
			type: 'int'
		},{
			name: 'code'
		},{
			name: 'description'
		}
	]
});