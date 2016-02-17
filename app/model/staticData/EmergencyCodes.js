Ext.define('Civic.model.staticData.EmergencyCodes', {
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