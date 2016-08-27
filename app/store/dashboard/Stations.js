Ext.define('Civic.store.dashboard.Stations', {
	extend: 'Ext.data.Store',//'Ext.data.ArrayStore',

	requires: [
		'Civic.model.dashboard.Station'
	],
	
	//storeId: 'dashboardStations',
	
	model: 'Civic.model.dashboard.Station',

	proxy: {
		type: 'ajax',
		url: 'php/engineering/dashboard/callslist.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}/*,

	data: [
		[1, 'MAIN WATER WORKS', 71, 77, 102, 250, 56, 30, 11, 5],
		[2, 'NKULUMANE', 84, 94, 80, 258, 33, 17, 19, 11],
		[3, 'MABUTWENI', 91, 70, 81, 242, 49, 28, 4, 0],
		[4, 'FAMONA', 68, 75, 95, 238, 62, 29, 3, 1],
		[5, 'NORTH END', 91, 95, 64, 250, 57, 7, 0, 0],
		[6, 'NKETA', 76, 75,78, 229, 40, 23, 7, 8],
		[7, 'ROADS YARD', 98, 92, 82, 272, 71, 9, 0, 2],
		[8, 'MZILIKAZI WORKSHOPS', 84, 73, 101, 258, 88, 3, 3, 7],
		[9, 'REVENUE HALL', 84, 67, 86, 237, 58, 17, 6, 5]
	],

	autoLoad: true*/
});