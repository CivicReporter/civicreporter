Ext.define('Civic.model.staticData.FireCodes', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'code_id',

	fields: [
		{
			name: 'code_id',
			type: 'int'
		},{
			name: 'description'
		}
	]
});