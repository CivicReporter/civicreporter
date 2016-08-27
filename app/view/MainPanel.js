Ext.define('Civic.view.MainPanel', {
    extend: 'Ext.tab.Panel',

    alias: 'widget.mainpanel',
	
	requires: [
		'Civic.view.dashboard.BarChart',
		'Civic.view.dashboard.PieChart',
		'Civic.view.dashboard.RadarChart',
		'Civic.view.dashboard.GaugeChart',
		'Civic.view.dashboard.LineChart',
		'Civic.view.civicr.StationSummaryGrid'
	],

    activeTab: 0,

    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            title: 'DashBoard',
			bodyPadding: 5,
			width: 1050,
			height: 740,
			layout: {
				type: 'fit'
			},
			
			items: [
				{
					xtype: 'tabpanel',
					title: 'CONSOLIDATED CALLS SUMMARY',
					tabPosition: 'left',			
					bodyPadding: 5,
					defaults: {
						layout: {
							type: 'vbox',
							align: 'stretch'
						},			
						bodyPadding: 5
					},
					
					items: [
						{
							xtype: 'container',
							itemId: 'swtab',
							title: 'Sewer & Water',
							iconCls: 'menu_engineering',
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
											xtype: 'tabpanel',
											title: 'CURRENT FAULTS STATUS',
											titleAlign: 'center',
											tabPosition: 'left',
											width: 630,
											defaults: {
												layout: {
													type: 'hbox',
													align: 'stretch'
												}
											},									
											items:[
												{
													title: 'Open',
													itemId: 'opengchart',
													items:[
														{
															xtype: 'gaugechart',
															width: 300,
															series: [{
																type: 'gauge',
																field: 'open_calls',
																donut: 50,
																colorSet: ['#ff6347','#ddd'],
																tips: {
																	trackMouse: true,
																	width: 150,
																	height: 20,
																	renderer: function(rec, item) {
																		this.setTitle(
																			rec.get('open_calls') + ' faults currently OPEN'
																		);
																	}
																}
															}],
															store: 'dashboard.Stations'
														},{
															xtype: 'piechart',
															flex: 1,
															series: [{
																type: 'pie',
																angleField: 'calls',
																showInLegend: true,
																donut: 25,
																tips: {
																	trackMouse: true,
																	width: 155,
																	height: 20,
																	renderer: function(rec, item) {
																		this.setTitle(
																			rec.get('calls') + ' faults OPEN for ' + rec.get('name')
																		);
																	}
																},
																highlight: {
																	segment: {
																		margin: 10
																	}
																}
															}],
															store: 'dashboard.StationCalls'
														}
													]
												},{
													title: 'Pending',
													itemId: 'pendinggchart',									
													items:[
														{
															xtype: 'gaugechart',
															width: 300,
															series: [{
																type: 'gauge',
																field: 'pending_calls',
																donut: 50,
																colorSet: ['#3aa8cb','#ddd'],
																tips: {
																	trackMouse: true,
																	width: 165,
																	height: 20,
																	renderer: function(rec, item) {
																		this.setTitle(
																			rec.get('pending_calls') + ' faults currently PENDING'
																		);
																	}
																}
															}],
															store: 'dashboard.Stations'
														},{												
															xtype: 'piechart',
															flex: 1,
															series: [{
																type: 'pie',
																angleField: 'calls',
																showInLegend: true,
																donut: 25,
																tips: {
																	trackMouse: true,
																	width: 170,
																	height: 20,
																	renderer: function(rec, item) {
																		this.setTitle(
																			rec.get('calls') + ' faults PENDING for ' + rec.get('name')
																		);
																	}
																},
																highlight: {
																	segment: {
																		margin: 10
																	}
																}
															}],
															store: 'dashboard.StationCalls'
														}
													]
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
									title: 'FAULT DISTRIBUTION BY CATCHMENT AREA FOR THE MONTH OF '+Ext.Date.format(new Date(), 'F, Y'),
									titleAlign: 'right',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 1,
									items: [
										{
											xtype: 'stationsummary',
											flex: 1,
											store: 'dashboard.Stations',
										},{
											xtype: 'barchart',
											width: 500,
											store: 'dashboard.Stations'
										}
									]
									
								}
							]
						},{
							xtype: 'container',
							title: 'Fire Services'
						},{
							xtype: 'container',
							title: 'Ambulance Services'
						},{
							xtype: 'container',
							title: 'Special Services'
						}
					]
				}
			]
        }
    ]
});