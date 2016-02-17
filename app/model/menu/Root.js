Ext.define('Civic.model.menu.Root', {
	extend: 'Ext.data.Model',

	uses: [
		'Civic.model.menu.Item'
	],

	idProperty: 'id',

	fields:[
		{
			name: 'ttext'
		},
		{
			name: 'iconcls'
		},
		{
			name: 'id'
		}
	],

	hasMany: {
		model: 'Civic.model.menu.Item',
		foreignKey: 'parentid',
		name: 'items'
	}
});