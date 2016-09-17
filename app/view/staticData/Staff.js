Ext.define('Civic.view.staticData.Staff', {
	extend: 'Civic.view.staticData.AbstractGrid',
	alias: 'widget.staffgrid',

	store: 'staticData.Staff',
	columns:[
		{
			text: 'Staff Id',
			width: 80,
			dataIndex: 'staff_id',
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			text: 'Call Sign',
			width: 80,
			dataIndex: 'call_sign',
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minVal: 0
			},
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
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
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
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
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
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
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			text: 'Section',
			dataIndex: 'section_id',
			width: 150,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Sections',
				displayField: 'name',
				valueField: 'section_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var sectionsStore = Ext.getStore('staticData.Sections');
				var section = sectionsStore.findRecord('section_id', value);

				return value ? Civic.util.Util.renderActive(section.get('name'), metaData, record) : '';
			}
		},{
			text: 'Station',
			dataIndex: 'station_id',
			width: 150,
			editor: {
				xtype: 'combobox',
				store: 'staticData.Stations',
				displayField: 'name',
				valueField: 'station_id',
				queryMode: 'local',
				allowBlank: false,
				maxLength: 45
			},
			renderer: function(value, metaData, record){
				var stationsStore = Ext.getStore('staticData.Stations');
				var station = stationsStore.findRecord('station_id', value);

				return value ? Civic.util.Util.renderActive(station.get('name'), metaData, record): '';
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
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderActive(value, metaData, record);
			}
		},{
			text: 'Status',
			dataIndex: 'active',
			width: 80,
			editor: {
				xtype: 'combobox',
				store: 'staticData.ActiveStatus',
				displayField: 'name',
				valueField: 'int',
				queryMode: 'local',
				allowBlank: false
			},
			renderer: function(value, metaData, record){
				var val;

				if (value == 't'){
					return Civic.util.Util.renderActive('ACTIVE', metaData, record);
				} else {
					return Civic.util.Util.renderActive('INACTIVE', metaData, record);
				}
			}
		}
	]
});