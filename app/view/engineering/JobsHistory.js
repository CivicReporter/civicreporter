Ext.define('Civic.view.engineering.JobsHistory', {
	extend: 'Civic.view.civcr.AbstractJobDetails',
	alias: 'widget.engjobshistory',

	plugins: [
		{
			ptype: 'rowexpander',
			rowBodyTpl: [
				'<table>'+
					'<tr><th align = "left">Stand Number:</th><td>{stand_no}</td></tr>'+
					'<tr><th align = "left">Street:</th><td>{street}</td></tr>'+
					'<tr><th align = "left">Suburb:</th><td>{suburb}</td></tr>'+
					'<tr><th align = "left">Description:</th><td>{description}</td></tr>'+
				'</table>'
			]
		}
	],
	
	dockedItems: [{}],

	columns: [
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
			text: 'Assigned By',
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
			text: 'Date Assigned',
			width: 140,
			dataIndex: 'opened_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: function (value, metaData, record) {
				 return Civic.util.Util.renderText(value, metaData, record);
			}
		},{
			xtype: 'datecolumn',
			text: 'Date Completed',
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
		}
	]
});