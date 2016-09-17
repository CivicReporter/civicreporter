Ext.define('Civic.view.civicr.JobsGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.jobsgrid',

	requires: [
		'Ux.grid.plugin.AssociationRowExpander',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
	plugins: [
		{
			ptype: 'associationrowexpander',
			pluginId: 'assoc',
            getterName : 'calls',
            gridConfig : {
                title   : 'Calls',
				features: [
					{
						ftype: 'filters',
						local: true
					}
				],
                columns : [
                    {
						text: 'Call Id',
						width: 100,
						dataIndex: 'call_id',
						filter: {
							type: 'numeric'
						}
					},{
						text: 'Fault Code',
						width: 100,
						dataIndex: 'code_id',
						filter: {
							type: 'string'
						},
						renderer: function(value, metaData, record){
							var fcStore = Ext.getStore('staticData.FaultCodes');
							var code = fcStore.findRecord('code_id', value);

							return value ? code.get('code') : '';
						}
					},{
						text: 'Caller Name',
						flex: 1,
						dataIndex: 'caller',
						filter: {
							type: 'string'
						}
					},{
						text: 'National ID',
						width: 100,
						dataIndex: 'nid',
						sortable: false,
						filter: {
							type: 'string'
						}
					},{
						text: 'Stand Number',
						width: 100,
						dataIndex: 'stand_no',
						filter: {
							type: 'numeric'
						}
					},{
						text: 'Suburb',
						width: 200,
						dataIndex: 'suburb_id',
						filter: {
							type: 'string'
						},
						renderer: function(value, metaData, record){
							var sbStore = Ext.getStore('staticData.Suburbs');
							var suburb = sbStore.findRecord('suburb_id', value);

							return value ? suburb.get('name') : '';
						}
					},{
						text: 'Property Damage',
						width: 100,
						dataIndex: 'property_damage',
						sortable: true,
						filter: {
							type: 'numeric'
						},
						renderer: function (value, metaData, record) {
							return value+'%';
						}
					},{
						xtype: 'datecolumn',
						text: 'Time Reported',
						width: 120,
						dataIndex: 'reported_on',
						format: 'Y-m-d H:i:s',
						filter: true,
						renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
					},{
						xtype: 'datecolumn',
						text: 'Last Update',
						width: 120,
						dataIndex: 'last_update',
						format: 'Y-m-d H:i:s',
						filter: true,
						renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
					}
                ]
            }
		}
	],
	features: [
		{
			ftype: 'filters',
			local: true
		}
	],
	columns:[
		{
			text: 'Job Id',
			width: 80,
			dataIndex: 'job_id',
			filter: {
				type: 'numeric'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Suburb',
			width: 150,
			dataIndex: 'suburb',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Status',
			width: 150,
			flex: 1,
			dataIndex: 'status',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Station Assigned',
			width: 150,
			dataIndex: 'station',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Opened By',
			width: 100,
			dataIndex: 'opened_by',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			xtype: 'datecolumn',
			text: 'Opened On',
			width: 140,
			dataIndex: 'opened_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Closed By',
			width: 100,
			dataIndex: 'closed_by',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			xtype: 'datecolumn',
			text: 'Closed On',
			width: 140,
			dataIndex: 'closed_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			xtype: 'datecolumn',
			text: 'Last Update',
			width: 140,
			dataIndex: 'last_update',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			xtype: 'actioncolumn',
			width: 30,
			align: 'center',
			sortable: false,
			menuDisabled: true,
			items: [
				{
					handler: function (view, rowIndex, colIndex, item, e, record) {
						this.fireEvent('itemclick', this, 'close', view, e, record);						
					},
					iconCls: 'accept',
					tooltip: 'Close job'
				}
			]
		},{
			xtype: 'actioncolumn',
			width: 30,
			align: 'center',
			sortable: false,
			menuDisabled: true,
			items: [
				{
					handler: function (view, rowIndex, colIndex, item, e, record) {
						this.fireEvent('itemclick', this, 'cancel', view, e, record);
					},
					iconCls: 'cancel',
					tooltip: 'Cancel job'
				}
			]
		}
	] 
});