Ext.define('Civic.store.dashboard.TimeSeries', {
	extend: 'Ext.data.ArrayStore',

	requires: [
		'Civic.model.dashboard.StationCalls'
	],
	
	//storeId: 'dashboardStations',
	
	model: 'Civic.model.dashboard.StationCalls',

	data: [
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 6), 'D, j'), 6],
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 5), 'D, j'), 3],
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 4), 'D, j'), 1],
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 3), 'D, j'), 7],
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 2), 'D, j'), 4],
		[Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.DAY, 1), 'D, j'), 3],
		[Ext.Date.format(new Date(), 'D, j'), 5]
	],

	autoLoad: true
});