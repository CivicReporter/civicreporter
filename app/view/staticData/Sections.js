Ext.define('Civic.view.staticData.Sections', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.sectionsgrid',

	store: 'staticData.Sections',
	columns:[
		{
			text: 'Section Id',
			width: 100,
			dataIndex: 'section_id',
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
		},{
			text: 'Code',
			dataIndex: 'code',
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