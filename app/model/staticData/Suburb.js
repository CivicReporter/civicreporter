Ext.define('Civic.model.staticData.Suburb', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'suburb_id',

	fields: [
		{
			name: 'suburb_id',
			type: 'int'
		},{
			name: 'name'
		},{
			name: 'zone_id',
			type: 'int'
		}
	]
});