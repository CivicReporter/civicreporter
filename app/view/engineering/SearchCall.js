Ext.define('Civic.view.engineering.SearchCall', {
	extend: 'Civic.view.civicr.SearchWindow',
	alias: 'widget.searchcall',

	requires: [
		'Civic.view.engineering.JobCalls'
	],

	title: 'Seach and Add Calls',
	iconCls: 'find',

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
					xtype: 'form',
					itemId: 'comboForm',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'label',
							text: 'Hold CTRL or SHIFT to select more than one call.',
							padding: '10 5 5 5',
							style: {
								fontWeight: 'bold'
							}
						},{
							xtype: 'combo',
							emptyText: 'search for calls by suburb',
							padding: '1 210 1 5',
							store: 'staticData.Suburbs',
							queryMode: 'local',
							displayField: 'name',
							valueField: 'suburb_id'/*,
							hideTrigger: true,
							typeAhead: true*/
						}

					]
				},{
					xtype: 'engjobcalls',
					height: 180,
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