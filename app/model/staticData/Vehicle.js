Ext.define('Civic.model.staticData.Vehicle', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'vehicle_id',

	fields: [
		{
			name: 'vehicle_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'type'
		},{
			name: 'station_id',
			type: 'int'
		},{
			name: 'radio',
			type: 'int'
		}
	]
});