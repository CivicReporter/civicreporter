Ext.define('Civic.controller.Main', {
    extend: 'Ext.app.Controller',

	stores: [
		'dashboard.Stations',
		'dashboard.SuburbGroups',
		'dashboard.StationCalls',
		'dashboard.TimeSeries'		
	],
	
	views: [
		'MainPanel'
	],

	refs: [
		{
			ref: 'mainPanel',
			selector: 'mainpanel'
		},{
			ref: 'barChart',
			selector: 'barchart'
		},{
			ref: 'gaugeChart',
			selector: 'opengchart'
		}
	],
	
	init: function(application){
		this.control({
			'mainpanel grid': {
				render: this.onGridRender,
				selectionchange: this.onGridSelectionChange
			}
		});
		
		this.listen({    
			store: {        
				'#dashboard.Stations': {            
					//beforesort: this.onStoreSort,
					//refresh: this.onStoreRefresh
				}    
			} 		
		});
	},
	
	onGridRender: function(component, options) {
		component.getStore().load();
		this.getDashboardStationsStore().load();
	},
	
	onGridSelectionChange: function(model, records) {
		var faultsPanel = this.getMainPanel().down('tabpanel').getComponent('swtab').down('tabpanel');
		
		var tab1 = faultsPanel.getComponent('opengchart'),
			tab2 = faultsPanel.getComponent('pendinggchart');
			
		var gchart1 = tab1.down('gaugechart'),
			gchart2 = tab2.down('gaugechart');
			
		//var store = this.getDashboardStationCallsStore();
		
		if(records[0]) {
			//this.highlightChartColumn(records[0]);
			
			if(gchart1.rendered) {
				gchart1.series.get(0).setValue(records[0].get('carried'));			
			}
			if(gchart2.rendered) {
				gchart2.series.get(0).setValue(records[0].get('pending'));			
			}
		/*
			rec1 = Ext.create('Civic.model.dashboard.StationCalls',{
				name: '24 hrs',
				calls: records[0].get('hr24').split(',')[0]
			});
			rec2 = Ext.create('Civic.model.dashboard.StationCalls',{
				name: '48 hrs',
				calls: records[0].get('hr48').split(',')[1]
			});
			rec3 = Ext.create('Civic.model.dashboard.StationCalls',{
				name: '72 hrs',
				calls: records[0].get('hr72').split(',')[2]
			});
			rec4 = Ext.create('Civic.model.dashboard.StationCalls',{
				name: '> 72hrs',
				calls: records[0].get('hr96').split(',')[3]
			});
			store.loadData([rec1,rec2,rec3,rec4]);*/
		}
	},
	
	onStoreSort: function() {
		var barChart = this.getBarChart();
		if (barChart) {
			var a = barChart.animate;
			barChart.animate = false;
			barChart.series.get(0).unHighlightItem();
			//barChart.animate = a;
		};
	},
	
	onStoreRefresh: function() {
		var selectedRec = this.getMainPanel().down('grid').getSelectionModel().getSelection();
			
		if (selectedRec[0]) {
			this.highlightChartColumn(selectedRec[0]);
		};
	},

	highlightChartColumn: function(record) {
		var me = this,
			name = record.get('name'),
			series = me.getBarChart().series.get(0),
			i, items, l;

		series.highlight = true;
		series.unHighlightItem();
		series.cleanHighlights();
		for (i = 0, items = series.items, l = items.length; i < l; i++) {
			if (name == items[i].value[0]) { //depends on the structure of your store data i.e. is it array data or json (object) data   ****.record.get('name')
				series.highlightItem(items[i]);
				break;
			}
		}
		series.highlight = false;
	}
});