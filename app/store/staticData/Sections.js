Ext.define('Civic.store.staticData.Sections', {
	extend: 'Civic.store.staticData.Abstract',

	requires: [
		'Civic.model.staticData.Section',
		'Civic.proxy.StaticData'
	],

	model:'Civic.model.staticData.Section',

	sorters: [
		{
			direction: 'ASC',
			property: 'section_id'
		}
	],

	proxy: {
		type: 'staticdataproxy',
		extraParams: {
			entity: 'staticdata.section',
			pkey: 'section_id'
		}
	}
});