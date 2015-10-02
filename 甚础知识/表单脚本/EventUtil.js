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


    // var newAnchor = document.createElement( "a" );
    // newAnchor.href = "#";
    // newAnchor.appendChild ( document.createTextNode("Test Link") );
    // document.body.appendChild(newAnchor);

    // newAnchor.onclick = function ( event ) {
    //     var target;

    //     event = EventUtil.getEvent ( event );
    //     EventUtil.preventDefault ( event );
    //     EventUtil.stopPropagation ( event );
    //     target = EventUtil.getTarget ( event );

    //     if ( "innerText" in target ) {
    //         target.innerText = target.innerHTML + 'X';
    //     } else {
    //         target.textContent = target.textContent + 'X';
    //     }
    // };
    
    // 阻止表单提交
    var form = document.getElementById("myForm");
    var input = document.getElementsByTagName("input")[0];
    EventUtil.addHandler(form, "submit", function(event){
      event = EventUtil.getEvent(event);
      EventUtil.preventDefault(event);
      console.log('submit');
    });
    // 不会触发submit事件，必须用提交按钮
    // submit()方法提交前，必须验证表单
    // form.submit();
    
    // 获取焦点
    EventUtil.addHandler(window, "load", function(){
        // 表单是否已经设置了autofocus属性
        if(input.autofocus !== true){
            input.focus();
            console.log('focus');
        }    
    });
    // input.readOnly = true;
    
    // 为focus/blur/change事件，添加交互
    // focus且未change时为黄色，change后为红色，空且blur时为无色
    // 注意这里autofocus时而无法触发focus事件，不如focus()可靠
    EventUtil.addHandler(input, "focus", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (target.style.backgroundColor != "red") {
            target.style.backgroundColor = "yellow";
        }
    });
    EventUtil.addHandler(input, "blur", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (/[^\d]/.test(target.value)) {
            target.style.backgroundColor = "red";
        } else {
            target.style.backgroundColor = "";
        }
    });
    EventUtil.addHandler(input, "change", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (/[^\d]/.test(target.value)) {
            target.style.backgroundColor = "red";
        } else {
            target.style.backgroundColor = "";
        }
    });

    

})(window, window.document);