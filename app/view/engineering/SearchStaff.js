Ext.define('Civic.view.engineering.SearchStaff', {
	extend: 'Civic.view.civicr.SearchWindow',
	alias: 'widget.searchstaff',

	requires: [
		'Civic.view.engineering.JobStaff'
	],

	title: 'Seach and Add Technicians',
	iconCls: 'find',

	items: [
		{
			xtype: 'form',
			itemId: 'staffForm',
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
							text: 'Hold CTRL or SHIFT to select more than one technician.',
							padding: '10 5 5 5',
							style: {
								fontWeight: 'bold'
							}
						},{
							xtype: 'combo',
							emptyText: 'search for technicians by station',
							padding: '1 210 1 5',
							store: 'staticData.Stations',
							queryMode: 'local',
							displayField: 'name',
							valueField: 'station_id'/*,
							hideTrigger: true,
							typeAhead: true*/
						}

					]
				},{
					xtype: 'engjobstaff',
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
							displayMsg: 'Displaying Technicians {0} - {1} of {2}'
						}
					]
				}
			]
		}
	]
});