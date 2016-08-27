Ext.define('Civic.model.dashboard.StationCalls', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'name'
		},{
			name: 'calls',
			type: 'int'
		}
	]
});