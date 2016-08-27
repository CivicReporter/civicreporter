Ext.define('Civic.store.dashboard.StationCalls', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.dashboard.StationCalls'
	],
	
	//storeId: 'dashboardStations',
	
	model: 'Civic.model.dashboard.StationCalls'
});