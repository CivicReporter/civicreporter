Ext.define('Civic.model.staticData.Section', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'section_id',

	fields: [
		{
			name: 'section_id',
			type: 'int'
		},{
			name: 'name'
		},{
			name: 'code'
		}
	]
});