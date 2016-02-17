Ext.define('Civic.view.staticData.Staff', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.staffgrid',

	store: 'staticData.Staff',
	columns:[
		{
			text: 'Staff Id',
			width: 100,
			dataIndex: 'staff_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Call Sign',
			width: 100,
			dataIndex: 'call_sign',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'First Name',
			dataIndex: 'firstname',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Last Name',
			flex: 1,
			dataIndex: 'surname',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Phone',
			dataIndex: 'phone',
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			filter: {
				type: 'string'
			}
		},{
			text: 'Section',
			dataIndex: 'section_id',
			width: 150,
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var sectionsStore = Ext.getStore('staticData.Sections');
				var section = sectionsStore.findRecord('section_id', value);

				return section != null ? section.get('name'): value;
			}
		},{
			text: 'Station',
			dataIndex: 'station_id',
			width: 200,
			editor: {
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var stationsStore = Ext.getStore('staticData.Stations');
				var station = stationsStore.findRecord('station_id', value);

				return station != null ? station.get('name'): value;
			}
		},{
			text: 'Role',
			dataIndex: 'role',
			width: 150,
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