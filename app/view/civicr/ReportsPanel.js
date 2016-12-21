Ext.define('Civic.view.civicr.ReportsPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.callreportpanel',

	requires: [
		'Civic.util.Util',
		'Civic.view.civicr.CallsGrid',
		'Civic.view.civicr.SuburbSummaryGrid'
	],

	defaults: {
		bodyPadding: 5
	},

	layout: {
		type: 'fit'
	},

	initComponent: function () {
		var me = this;
		var store = Ext.getStore('dashboard.TimeSeries');
		var es = new EventSource('php/streaming.php');

		es.addEventListener('message', function (e) {
			store.loadData(Ext.JSON.decode(e.data, true));
		}, false);

		me.items = [
			{
				xtype: 'container',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},			
				bodyPadding: 5,
				items: [
					{
						xtype: 'container',
						height: 250,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},									
						items:[
							{
								xtype: 'form',
								title: 'SEARCH FILTERS',
								width: 630,
								bodyPadding: '10 100 15 10',
								layout: {
									type: 'table',
									columns: 2
								},
								defaults: {
									width: 195,
									padding: '15 0 0 10'
								},
								bbar: [
									'-',{
										xtype: 'button',
										text: 'Clear',
										itemId: 'clear',
										iconCls: 'clear',
										tooltip: 'Clear values'//
										//disabled: true			
									},'-',{
										xtype: 'button',
										text: 'Search',
										itemId: 'search',
										iconCls: 'search',
										tooltip: 'Search'//,
										//disabled: true				
									},'-'
								],								
								items:[
									{
										xtype: 'combobox',
										name: 'fcode',
										itemId: 'fcode',
										valueField: 'code_id',
										tpl: Ext.create('Ext.XTemplate',
									        '<tpl for=".">',
									            '<div class="x-boundlist-item">{code} - {description}</div>',
									        '</tpl>'
									    ),
									    displayTpl: Ext.create('Ext.XTemplate',
									        '<tpl for=".">',
									            '{code} - {description}',
									        '</tpl>'
									    ),
										emptyText: 'Filter By Fault Code',
										queryMode: 'local',
										store: 'staticData.FaultCodes',
										width: 400,
										colspan: 2
									},{
										xtype: 'datefield',
										emptyText: 'From Date',
										name: 'from_date',
										itemId: 'from_date',
										maxValue: new Date(),
										format: 'Y-M-d'
									},{
										xtype: 'datefield',
										emptyText: 'To Date',
										name: 'to_date',
										itemId: 'to_date',
										maxValue: new Date(),
										format: 'Y-M-d',
										disabled: true
									},{
										xtype: 'timefield',
										emptyText: 'From Time',
										name: 'from_time',
										itemId: 'from_time',
										maxValue: new Date(),
										increment: 60
									},{
										xtype: 'timefield',
										emptyText: 'To Time',
										name: 'to_time',
										itemId: 'to_time',
										maxValue: new Date(),
										increment: 60
									}
								]
							},{
								xtype: 'panel',
								title: 'ACTION TIMELINES',
								titleAlign: 'center',
								flex: 1,
								layout: {
									type: 'fit'
								},
								items: [
									{
										xtype: 'linechart',
										store: 'dashboard.TimeSeries'
									}
								]
							}
						]
					},{
						xtype: 'panel',
						title: 'CUMMULATIVE FAULT ATTENDANCE REPORT BY CATCHMENT AREA TO DATE',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						flex: 1,
						items: [
							{
								xtype: 'suburbsummary',
								flex: 1,
								store: 'reports.SuburbGroups'
							},{
								xtype: 'barchart',
								width: 500,
								store: 'reports.Stations'
							}
						]
						
					}
				]
			}
		];

		me.callParent(arguments);
	}
});