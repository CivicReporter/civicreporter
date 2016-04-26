Ext.define('Civic.view.engineering.JobStaff', {
	extend: 'Civic.view.civcr.AbstractJobDetails',
	alias: 'widget.engjobstaff',

	plugins: [
		{
			ptype: 'rowexpander',
			rowBodyTpl: [
				'<table>'+
					'<tr><th align = "left">Section:</th><td>{section_id}</td></tr>'+
					'<tr><th align = "left">Station:</th><td>{station_id}</td></tr>'+
				'</table>'
			]
		}
	],

	columns: [
		{
			text: 'Staff Id',
			width: 60,
			dataIndex: 'staff_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'First Name',
			width: 70,
			dataIndex: 'firstname',
			filter: {
				type: 'string'
			}
		},{
			text: 'Last Name',
			width: 100,
			flex: 1,
			dataIndex: 'surname',
			filter: {
				type: 'string'
			}
		},{
			text: 'Call Sign',
			width: 70,
			dataIndex: 'call_sign',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Phone',
			width: 80,
			dataIndex: 'phone',
			filter: {
				type: 'string'
			}
		},{
			text: 'Role',
			width: 120,
			dataIndex: 'role',
			filter: {
				type: 'string'
			}
		}
	]
});