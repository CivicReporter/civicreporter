Ext.define('Civic.model.staticData.Suburb', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'suburb_id',

	fields: [
		{
			name: 'suburb_id',
			type: 'int',
			useNull: false
		},{
			name: 'name'
		},{
			name: 'fire_catch_id',
			type: 'int'
		},{
			name: 'sewer_catch_id',
			type: 'int'
		},{
			name: 'water_catch_id',
			type: 'int'
		},{
			name: 'geom_900913'
		}
	]
});