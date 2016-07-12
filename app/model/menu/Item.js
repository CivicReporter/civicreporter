Ext.define('Civic.model.menu.Item', {
	extend: 'Ext.data.Model',

	uses: [
		'Civic.model.menu.Root'
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
			name: 'classname'
		},
		{
			name: 'id'
		},
		{
			name: 'parentid'
		}
	],

	belongsTo: {
		model: 'Civic.model.menu.Root',
		foreignKey: 'parentid'
	}
});