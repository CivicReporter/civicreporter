Ext.define('Civic.view.engineering.JobCalls', {
	extend: 'Civic.view.civcr.AbstractJobDetails',
	alias: 'widget.engjobcalls',

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

	columns: [
		{
			text: 'Call Id',
			width: 45,
			dataIndex: 'call_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Fault Code',
			width: 70,
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
			text: 'Suburb',
			width: 100,
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
			xtype: 'datecolumn',
			text: 'Time Reported',
			width: 120,
			dataIndex: 'reported_on',
			format: 'Y-m-d H:i:s',
			filter: true,
			renderer: Ext.util.Format.dateRenderer('j M Y H:i:s')
		}
	]
});