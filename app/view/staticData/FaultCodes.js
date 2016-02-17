Ext.define('Civic.view.staticData.FaultCodes', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.faultcodesgrid',

	store: 'staticData.FaultCodes',
	columns:[
		{
			text: 'Code Id',
			width: 100,
			dataIndex: 'code_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Section',
			width: 150,
			dataIndex: 'section_id',
			renderer: function(value, metaData, record){
				var sectionsStore = Ext.getStore('staticData.Sections');
				var section = sectionsStore.findRecord('section_id', value);

				return section != null ? section.get('name'): value;
			}
		},{
			text: 'Code',
			width: 100,
			dataIndex: 'code',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
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