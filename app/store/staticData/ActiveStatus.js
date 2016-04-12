Ext.define('Civic.store.staticData.ActiveStatus', {
	extend: 'Ext.data.ArrayStore',

	fields: [
		{
			name: 'name'
		},{
			name: 'int'
		}
	],

	data: [
		['ACTIVE', 't'],['INACTIVE', 'f']
	],

	autoLoad: true
});