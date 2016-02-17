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
						dataIndex: 'code',
						filter: {
							type: 'string'
						}
					},{
						text: 'Caller Name',
						flex: 1,
						dataIndex: 'caller',
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
						dataIndex: 'suburb',
						filter: {
							type: 'string'
						}
					},{
						text: 'Severity',
						width: 60,
						dataIndex: 'severity',
						sortable: true,
						filter: {
							type: 'numeric'
						}
					},{
						text: 'Property Damage',
						width: 100,
						dataIndex: 'property_damage',
						sortable: true,
						filter: {
							type: 'string'
						},
						renderer: function (value, metaData, record) {
							return value == 't' ? 'Yes' : 'No';
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
			width: 100,
			dataIndex: 'job_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Status',
			width: 200,
			flex: 1,
			dataIndex: 'status',
			filter: {
				type: 'string'
			},
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			text: 'Opened By',
			width: 150,
			dataIndex: 'opened_by',
			filter: {
				type: 'string'
			}
		},{
			xtype: 'datecolumn',
			text: 'Opened On',
			width: 120,
			dataIndex: 'opened_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
		},{
			text: 'Closed By',
			width: 150,
			dataIndex: 'closed_by',
			filter: {
				type: 'string'
			}
		},{
			xtype: 'datecolumn',
			text: 'Closed On',
			width: 120,
			dataIndex: 'closed_on',
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
});