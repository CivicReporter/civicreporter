Ext.define('Civic.view.staticData.Sewer', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.sewergrid',

	store: 'staticData.Sewer',
	columns:[
		{
			text: 'Catchment Id',
			width: 100,
			dataIndex: 'catch_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Name',
			flex: 1,
			dataIndex: 'name',
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