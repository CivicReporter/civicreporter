Ext.define('Civic.store.staticData.Sections', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Section',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Section',

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'Section',
			pkey: 'section_id'
		}
	},

	autoLoad: true
});