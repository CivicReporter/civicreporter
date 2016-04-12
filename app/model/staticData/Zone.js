Ext.define('Civic.model.staticData.Zone', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'zone_id',

	fields: [
		{
			name: 'zone_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		}
	]
});