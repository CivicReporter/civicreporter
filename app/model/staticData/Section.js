Ext.define('Civic.model.staticData.Section', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'section_id',

	fields: [
		{
			name: 'section_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'code'
		}
	]
});