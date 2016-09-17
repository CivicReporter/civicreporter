Ext.define('Civic.model.staticData.Catchment', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'catch_id',

	fields: [
		{
			name: 'catch_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'station_id',
			type: 'int'
		}
	]
});