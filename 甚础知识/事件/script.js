// Cross Browser Event Utility
// Nicholas Zakas, Professional JavaScript for Web Developers p.441

(function(window, document) {
    'use strict';
    var
        EventUtil = {
            addHandler: function( element, type, handler ) {
                if ( element.addEventListener ) {
                    element.addEventListener ( type, handler, false );
                } else if ( element.attachEvent ) {
                    element.attachEvent ( "on" + type, handler );
                } else {
                    element["on" + type] = handler;
                }
            },

            getEvent: function ( event ) {
                return event ? event : window.event;
            },

            getTarget: function ( event ) {
                return event.target || event.srcElement;
            },

            preventDefault: function ( event ) {
                if ( event.preventDefault ) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },

            removeHandler: function( element, type, handler ) {
                if ( element.removeEventListener ) {
                    element.removeEventListener ( type, handler, false );
                } else if ( element.detachEvent ) {
                    element.detachEvent ( "on" + type, handler );
                } else {
                    element["on" + type] = null;
                }
            },

            stopPropagation: function ( event ) {
                if ( event.stopPropagation ) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }

        };

    var btn = document.getElementById("myBtn");

    (function () {

        document.body.onclick = function (event) {
            alert(event.eventPhase);//3
            console.log(event.currentTarget === document.body);
            console.log(this === document.body);
            console.log(event.target === btn);
        }

        //一个函数处理多个事件
        var handler = function (event) {
            switch (event.type){
                case "click":
                    alert('btn ' + event.eventPhase); //2
                    //阻止事件传播
                    //event.stopPropagation();
                    break;
                case "mouseover":
                    event.target.style.backgroundColor = "red";
                    break;
                case "mouseout":
                    event.target.style.backgroundColor = "";
                    break;
            }
        }

        btn.onclick = handler;
        btn.onmouseover = handler;
        btn.onmouseout = handler;

        document.body.addEventListener("click", function(event){
            "use strict";
            alert(event.eventPhase); //1
        }, true);

    });

    //获取坐标
    (function () {
        EventUtil.addHandler(btn, 'click', function (event) {
            event = EventUtil.getEvent(event);
            alert(event.clientX + "." +event.clientY + " " + event.pageX + "." + event.pageY + " " + event.screenX + "."
                + event.screenY )
        })
    });

    // 检测辅助键
    (function () {
        EventUtil.addHandler(btn, "click", function (event) {
            event = EventUtil.getEvent(event);
            var keys = new Array();

            if(event.shiftKey){
                keys.push("shift");
            }

            if(event.ctrlKey){
                keys.push("ctrl");
            }

            if(event.altKey){
                keys.push("alt");
            }

            if(event.metaKey){
                keys.push("meta");
            }

            alert("Keys: " + keys.join(", "));
        })
    })();

    // pageShow 没测出来
    (function () {
        var showCount = 0;

        EventUtil.addHandler(window, "load", function (event) {
            alert("load fired");
        })

        EventUtil.addHandler(window, "pageShow", function (event) {
            showCount++;
            console.log("Show has been fired " + showCount + " times.")
        })
    });

    // context menu
    (function () {
        EventUtil.addHandler(window, "load", function (event) {
            var div = document.getElementById("myDiv");

            EventUtil.addHandler(div, "contextmenu", function (event) {
                event = EventUtil.getEvent(event);
                EventUtil.preventDefault(event);

                var menu = document.getElementById("myMenu");
                menu.style.left = event.clientX + "px";
                menu.style.top = event.clientY + "px";
                menu.style.visibility = "visible";
            });

            EventUtil.addHandler(document, "click", function (event) {
                document.getElementById("myMenu").style.visibility = "hidden";
            })
        })

        EventUtil.addHandler(window, "beforeunload", function (event) {
            event = EventUtil.getEvent(event);
            var message ="Leave?";
            event.returnValue = message;
            return message;
        })
    })()

})(window, window.document);

