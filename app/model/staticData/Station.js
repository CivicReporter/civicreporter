Ext.define('Civic.model.staticData.Station', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'station_id',

	fields: [
		{
			name: 'station_id',
			type: 'int',
			useNull: false
		},{
			name: 'suburb_id',
			type: 'int'
		},{
			name: 'name'
		},{
			name: 'type'
		}
	]
});