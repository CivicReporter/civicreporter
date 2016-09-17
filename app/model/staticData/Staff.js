Ext.define('Civic.model.staticData.Staff', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'staff_id',

	fields: [
		{
			name: 'staff_id',
			type: 'int',
			useNull: false
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
			name: 'section_id',
			type: 'int'
		},{
			name: 'station_id',
			type: 'int'
		},{
			name: 'role'
		},{
			name: 'active'
		},{
			name: 'status'
		}
	]
});