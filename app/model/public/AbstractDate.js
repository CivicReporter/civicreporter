Ext.define('Civic.model.public.AbstractDate', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'last_update',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		}
	]
});