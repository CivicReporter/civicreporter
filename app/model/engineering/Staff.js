Ext.define('Civic.model.engineering.Staff', {
	extend: 'Civic.model.staticData.Staff',
	requires: [
		'Civic.model.public.AbstractJob'
	],

	idProperty: 'staff_id',

	hasMany: [
		{
			foreignKey: 'staff_id',
	        name: 'jobs',
	        model: 'Civic.model.public.AbstractJob'
		}
	],

    proxy:{
        type: 'ajax',
        url: 'php/engineering/staff/list.php',
        
        reader: {
            type: 'json',
			messageProperty: 'msg',
            root: 'data'
        }
    }
});