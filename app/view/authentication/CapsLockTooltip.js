Ext.define('Civic.view.authentication.CapsLockTooltip',{
	extend: 'Ext.tip.QuickTip',
	alias: 'widget.capslocktooltip',
	
	target:'password',
	anchor: 'top',
	anchorOffset: 60,
	width: 180,
	dismissDelay: 0,
	autoHide: false,
	title: '<div class = "capslock">Caps Lock is On</div>',
	html: '<div>Having Caps Lock On may cause</div>'+'<div>you to enter the wrong password.</div>'
});