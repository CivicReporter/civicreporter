Ext.define('Civic.view.gis.AbstractPopup', {
    extend: 'GeoExt.window.Popup',
    alias : 'widget.civicr_pop',

    title: 'Job Details',
    width:200,
    anchorPosition: 'auto',
    alwaysOnTop: true,
    panIn: true,
    unpinnable: false
});
