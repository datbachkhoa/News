Ext.define('News.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'News.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'Admin',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false,
            msgTarget: 'under'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            msgTarget: 'under'
        }],
        buttons: [
        {
            text: 'Cancel',
            listeners: {
                click: 'onCancelLogin'
            }
        },
        {
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});