// var init = function(){
//     $(document).ready(function(){
        

//         $('[data-change]').click(function(){
//             console.log('clicou');
//             changeView(this.data['change']);
//         });

        
//     });
// };

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License a
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();        
        $app = $('#app');
        this.changeView('#login')
        //this.showAlert('Iniciando ...', 'Info');        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(window).on('hashchange', $.proxy(this.route, this));
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },

    routes: [
        'login',
        'home'
    ],

    route: function() {
        var hash = window.location.hash;

        if (!hash) {
            //this.changeView('#login');
            return;
        }

        if (this.routes.indexOf(hash.replace('#','')) !== -1) {
            this.changeView(hash);
        }
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    template: function($t){
        var expReg = /<%\s*include\s*(.*?)\s*%>/g;

        if ($t.match(expReg)){
            return this.template($t.replace(
                expReg, 
                function(match, templateId){
                    var el = $('#' + templateId);                
                    return el ? el.html() : '';                
                })
            );    
        }else{
            return $t;
        }    
    },

    changeView: function(id){
        var $tmp = $(id).html();
        var view = this.template($tmp);
        var duration = 0.5;

        setTimeout(function() {
            this.$app
                .fadeOut()
                .html(view)
                .fadeIn();
        }, 50);               
    }
};
