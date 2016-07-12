Ext.define('Civic.store.menu.Menu', {
	extend: 'Ext.data.Store',

	requires: [
		'Civic.model.menu.Root'
	],

	model: 'Civic.model.menu.Root',

	proxy: {
		type: 'ajax',
		url: 'php/menu/menu.php',
		reader: {
			type: 'json',
			root: 'items'
		}
	}
});