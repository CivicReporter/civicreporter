Ext.define('Civic.store.engineering.StaffStatus', {
	extend: 'Ext.data.ArrayStore',

	fields: [
		{
			name: 'text'
		}
	],

	data: [
		['AVAILABLE'],['BUSY'],['OFF DUTY'],['STANDBY']
	],

	autoLoad: true
});