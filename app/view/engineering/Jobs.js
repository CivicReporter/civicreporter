Ext.define('Civic.view.engineering.Jobs', {
	extend: 'Civic.view.civicr.JobsGrid',
	alias: 'widget.jobspanel',//engjobsgrid

	requires: [
		'Civic.view.toolbar.AddEditDeleteFilter'
	],

	store: 'engineering.Jobs',

	dockedItems: [
		{
			dock: 'bottom',
			xtype: 'pagingtoolbar',
			store: 'engineering.Jobs',
			displayInfo: true,
			displayMsg: 'Displaying Jobs {0} - {1} of {2}'
		},{
			xtype: 'addeditdeletefilter'
		}
	]
});