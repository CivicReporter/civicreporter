Ext.define('Civic.model.engineering.Job', {
	extend: 'Civic.model.public.AbstractJob',
	requires: [
		'Civic.model.engineering.Call'
	],

	idProperty: 'job_id',

	hasMany: [
		{
			foreignKey: 'job_id',
	        name: 'calls',
	        model: 'Civic.model.engineering.Call'
		}
	],

    proxy:{
        type: 'ajax',
        url: 'php/engineering/jobs/list.php',
        
        reader: {
            type: 'json',
			messageProperty: 'msg',
            root: 'jobs'
        }
    }
});