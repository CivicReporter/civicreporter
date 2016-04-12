Ext.define('Civic.view.engineering.JobStaff', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.engjobstaff',

	requires: [
		'Civic.view.toolbar.SearchAddDelete',
		'Ext.grid.plugin.RowExpander',
		'Ext.ux.grid.FiltersFeature',
		'Civic.util.Util'
	],

	columnLines: true,
	viewConfig: {
		stripeRows: true
	},
	autoScroll: true,

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

	features: [
		{
			ftype: 'filters',
			local: true
		}
	],

	columns: [
		{
			text: 'Staff Id',
			width: 80,
			dataIndex: 'staff_id',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'First Name',
			dataIndex: 'firstname',
			filter: {
				type: 'string'
			}
		},{
			text: 'Last Name',
			flex: 1,
			dataIndex: 'surname',
			filter: {
				type: 'string'
			}
		},{
			text: 'Call Sign',
			width: 80,
			dataIndex: 'call_sign',
			filter: {
				type: 'numeric'
			}
		},{
			text: 'Phone',
			dataIndex: 'phone',
			filter: {
				type: 'string'
			}
		},{
			text: 'Role',
			dataIndex: 'role',
			filter: {
				type: 'string'
			}
		}
	],

	dockedItems: [
		{
			xtype: 'searchadddelete'
		}
	]
});