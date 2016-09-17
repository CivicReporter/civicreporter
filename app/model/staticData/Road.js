Ext.define('Civic.model.staticData.Road', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'gid',

	fields: [
		{
			name: 'gid',
			type: 'int',
			useNull: false
		},{
			name: 'suburb_id',
			type: 'int'
		},{
			name: 'name'
		}
	]
});