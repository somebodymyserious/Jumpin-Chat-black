// ==UserScript==
// @name         JUMPIN TEST
// @match        https://jumpin.chat/tech
// @match        https://jumpin.chat/notfat
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// ==/UserScript==
(function() {
    'use strict';

    var packetCount = 0;

    function JC_ChangeTheme(backgroundColour, foregroundColour, applyBackground) {
        for(var i = 0; i < applyBackground.length; ++i) {
            var chatElements = document.getElementsByClassName(applyBackground[i]);
            for(var j = 0; j < chatElements.length; j++) {
                chatElements[j].style = 'background: ' + backgroundColour + ' !important; color: ' + foregroundColour + ' !important;';
                console.log('changed style to background: ' + backgroundColour + ' !important;');
            }
            console.log(chatElements);
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
                // When connected
                if(packetCount > 1) {
                    //var handle = "NOTFAT_" + Math.floor((Math.random() * 100) + 1);
                    //this.send("42"+JSON.stringify(["room::handleChange",{"handle":handle}]));
                } //42["room::handleChange",{"handle":"NOTFAT"}]
                //console.log(packetCount);
            }, false, packetCount);

            packetCount += 1;

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
