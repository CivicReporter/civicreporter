Ext.define('Civic.store.staticData.Catchments', {
	extend: 'Ext.data.ArrayStore',

	fields: [
		{
			name: 'text'
		}
	],

	data: [
		['AMB'],['FIRE'],['SEWER'],['WATER']
	],

	autoLoad: true
});