// ==UserScript==
// @name         JUMPIN TEST
// @match        https://jumpin.chat/*
// ==/UserScript==
(function() {
    'use strict';
    
    function JC_ChangeTheme(backgroundColour, foregroundColour, applyBackground) {
        for(var i = 0; i < applyBackground.length; ++i) {
            var chatElements = document.getElementsByClassName(applyBackground[i]);
            for(var j = 0; j < chatElements.length; j++) {
                chatElements[j].style = 'background: ' + backgroundColour + ' !important; color: ' + foregroundColour + ' !important;';
            }
        }
    }

    function JC_RemoveElements(toRemove) {
        if(toRemove.length > 0) {
            for(var i = 0; i < toRemove.length; i++) {
                var chatElements = document.getElementsByClassName(toRemove[i]);
                for(var j = 0; j < chatElements.length; j++) {
                    chatElements[j].style = 'display: none !important;';
                }
            }
        }
    }

    function JC_Log_Packets() {
        WebSocket.prototype._send = WebSocket.prototype.send;
        WebSocket.prototype.send = function (data) {
            var send = this._send(data);

            this.addEventListener('message', function (message) {
              // do stuff
            }, false);

            this.send = function (data) {
                this._send(data);
                console.log("<< " + data);
            };
        }
    }

    JC_Log_Packets();
    setInterval(function() {
       document.getElementById('app').style = 'margin-top: -50px;';
       JC_ChangeTheme('green', '#ffffff', ['button-blue', 'button-default']);
       JC_ChangeTheme("#000000", "#FFFFFF", ['chat__Header', 'cams__Header', 'cams__ContainerInternal', 'chat__Feed', 'chat__UserList', 'chat__Body', 'chat__FeedWrapper', 'privateMessages__Empty', 'privateMessages__Empty', 'privateMessages__Wrapper']);
       JC_RemoveElements(['roomHeader', 'chat__Share']);
    }, 1000);

})();
