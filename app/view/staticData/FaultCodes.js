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
			editor: {
				xtype: 'combobox',
				store: 'staticData.Sections',
				displayField: 'name',
				valueField: 'section_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			},
			renderer: function(value, metaData, record){
				var sectionsStore = Ext.getStore('staticData.Sections');
				var section = sectionsStore.findRecord('section_id', value);

				return value ? section.get('name'): '';
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