Ext.define('Civic.view.toolbar.AddEditCancelFilter', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.addeditcancelfilter',

	flex: 1,
	dock: 'top',
	items: [
		{
			xtype: 'button',
			text: 'New',
			itemId: 'add',
			iconCls: 'add',
			tooltip: 'Add new call'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			text: 'Edit',
			itemId: 'edit',
			disabled: true,
			iconCls: 'edit',
			tooltip: 'Edit selected call'
		},{
			xtype: 'button',
			text: 'Cancel',
			itemId: 'cancel',
			disabled: true,
			iconCls: 'cancel',
			tooltip: 'Set call status to "Cancelled"'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			itemId: 'clearFilter',
			text: 'Clear Filters',
			iconCls: 'clear_filter',
			tooltip: 'Clear column filters'
		},{
			xtype: 'tbseparator'
		},{
			xtype: 'button',
			itemId: 'print',
			text: 'Print',
			iconCls: 'print',
			tooltip: 'Print current page'
		},{
			xtype: 'button',
			itemId: 'toPdf',
			text: 'Export to PDF',
			iconCls: 'to_pdf',
			tooltip: 'Generate PDF document'
		},{
			xtype: 'button',
			itemId: 'toExcel',
			text: 'Export to Excel',
			iconCls: 'to_excel',
			tooltip: 'Generate Excel sheet'
		}
	]
});