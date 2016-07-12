Ext.define('Civic.controller.menu.Menu', {
	extend: 'Ext.app.Controller',

	models: [
		'menu.Root',
		'menu.Item'
	],

	stores: [
		'menu.Menu'
	],
	
	views: [
		'menu.Accordion',
		'menu.Item'
	],

	refs: [
		{
			ref: 'menuPanel',
			selector: 'mainmenu'
		},{
			ref: 'mainPanel',
			selector: 'mainpanel'
		}
	],
	
	init: function(application){
		this.control({
			'mainmenu': {
				render: this.onPanelRender
			},
			'mainmenuitem': {
				select: this.onTreepanelSelect,
				itemclick: this.onTreepanelItemClick
			}
		});
	},

	onPanelRender: function (abstractcomponent, options) {
		
		var me = this;

		me.getMenuMenuStore().load(function (records, op, success) {

			Ext.each(records, function (root) {
				var menu = Ext.create('Civic.view.menu.Item', {
					title: root.get('ttext'),
					iconCls: root.get('iconcls')
				});

				Ext.each(root.items(), function (itens) {
					Ext.each(itens.data.items, function (item) {
						menu.getRootNode().appendChild({
							text: item.get('ttext'),
							leaf: true,
							iconCls: item.get('iconcls'),
							id: item.get('id'),
							className: item.get('classname')
						});
					});
				});

				abstractcomponent.add(menu);
			});
		});
	},

	onTreepanelSelect: function (selModel, record, index, options) {
		var mainPanel = this.getMainPanel();

		var newTab = mainPanel.items.findBy(function (tab) {
			return tab.title == record.get('text');
		});

		if (!newTab) {
			newTab = mainPanel.add({
				xtype: record.raw.className,
				closable: true,
				iconCls: record.get('iconCls'),
				title: record.get('text')
			});
		};

		mainPanel.setActiveTab(newTab);
	},

	onTreepanelItemClick: function (view, record, item, index, event, options) {
		this.onTreepanelSelect(view, record, index, options);
	}
});