Ext.define('Civic.view.staticData.FireCodes', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.firecodesgrid',

	store: 'staticData.FireCodes',
	columns:[
		{
			text: 'Code Id',
			width: 100,
			dataIndex: 'code_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Description',
			flex: 1,
			dataIndex: 'description',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		}
	]
});