Ext.define('Civic.model.staticData.Staff', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'staff_id',

	fields: [
		{
			name: 'staff_id',
			type: 'int'
		},{
			name: 'call_sign',
			type: 'int'
		},{
			name: 'firstname'
		},{
			name: 'surname'
		},{
			name: 'phone'
		},{
			name: 'section_id'
		},{
			name: 'station_id'
		},{
			name: 'role'
		}
	]
});