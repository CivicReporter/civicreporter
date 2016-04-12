Ext.define('Civic.model.staticData.Property', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'property_id',

	fields: [
		{
			name: 'property_id',
			type: 'int',
			useNull: false
		},{
			name: 'suburb_id',
			type: 'int'
		},{
			name: 'stand_no',
			type: 'int'
		},{
			name: 'street',
			type: 'string'
		},{
			name: 'owner',
			type: 'string'
		},{
			name: 'value',
			type: 'float'
		}
	]
});