Ext.define('Civic.view.engineering.SearchCall', {
	extend: 'Civic.view.civicr.SearchWindow',
	alias: 'widget.searchcall',

	requires: [
		'Civic.view.engineering.JobCalls'
	],

	title: 'Add Call',
	iconCls: 'add',

	items: [
		{
			xtype: 'form',
			itemId: 'callForm',
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'end'
			},
			items: [
				{
					xtype: 'label',
					text: 'Hold Ctrl to select more than one call.',
					padding: '10 5 5 5',
					style: {
						fontWeight: 'bold'
					}
				},{
					xtype: 'engjobcalls',
					height: 210,
					selModel: {
						mode: 'MULTI',
						allowDeselect: true
					},
					dockedItems: [
						{
							dock: 'bottom',
							xtype: 'pagingtoolbar',
							displayInfo: true,
							displayMsg: 'Displaying Calls {0} - {1} of {2}'
						}
					]
				}
			]
		}
	]
});