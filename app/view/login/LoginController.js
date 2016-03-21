Ext.define('News.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(button, e, options) {
        var formPanel = button.up('form'),
            login = button.up('login'),
            user = formPanel.down('textfield[name=username]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue();

            if (formPanel.getForm().isValid()) {
                Ext.Ajax.request({
                    url: 'php/login.php',
                    method: 'POST',
                    params: {
                        user: user,
                        password: pass
                    },
                    failure: function(conn, response, options, eOpts) {
                        Ext.Msg.show({
                            title:'Error!',
                            msg: conn.responseText,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    },
                    success: function(conn, response, options, eOpts){
                        var result = Ext.JSON.decode(conn.responseText, true);

                        if (!result){ // #2
                            result = {};
                            result.success = false;
                            result.msg = conn.responseText;
                        }
                        if (result.success) { // #3
                            login.close(); // #4
                            Ext.create('News.view.MyViewport'); // #5
                        } else {
                            Ext.Msg.show({
                                title:'Fail!',
                                msg: result.msg, // #6
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                });
            }
    },

    onCancelLogin: function(){
        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        localStorage.setItem("loggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });

        this.redirectTo('');
    }
});