Ext.define('Civic.model.engineering.Call', {
	extend: 'Civic.model.public.AbstractCall',

	idProperty: 'call_id',

	fields: [
		{
			name: 'severity',
			type: 'int'
		},{
			name: 'property_damage'
		}
	]
});