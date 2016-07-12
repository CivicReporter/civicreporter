Ext.define('Civic.store.staticData.Status', {
	extend: 'Ext.data.ArrayStore',

	fields: [
		{
			name: 'text'
		}
	],

	data: [
		['PENDING'],['CANCELLED'],['CLOSED']
	],

	autoLoad: true
});