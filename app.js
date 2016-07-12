/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'Civic',

    extend: 'Civic.Application',

    autoCreateViewport: false
});

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        Ext: './ext/src',
        GeoExt: './resources/geoext/src/GeoExt',
        'Ext.ux': 'ext/ux',
        'Civic.util': 'app/util'
    }
});
