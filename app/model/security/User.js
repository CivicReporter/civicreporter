Ext.define('Civic.model.security.User', {
	extend: 'Civic.model.public.AbstractDate',

	idProperty: 'id',

	fields:[
		{
			name: 'id',
			type: 'int'
		},{
			name: 'firstname'
		},{
			name: 'lastname'
		},{
			name: 'username'
		},{
			name: 'email'
		},{
			name: 'picture'
		},{
			name: 'groupid'
		},{
			name: 'active'
		},{
			name: 'created_on',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		}
	]
});