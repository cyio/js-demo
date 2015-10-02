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
        },
        
        getCharCode:function(event){   //以跨浏览器取得相同的字符编码，需在keypress事件中使用
           if(typeof event.charCode=="number"){
              return event.charCode;
           }else{
              return event.keyCode;
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
      var target = EventUtil.getTarget(event);
      // EventUtil.preventDefault(event);
      console.log('submit');
      // 检查有效性
      (function(){
          // console.log(input);
          if(target.checkValidity()) {
              alert('pass');
          } else {
              alert('bad');
          }
      })();

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

    // 过滤输入
    EventUtil.addHandler(input, "keypress", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        // 获取按键编码
        var charCode = EventUtil.getCharCode(event);
        // console.log(String.fromCharCode(charCode));
        
        // 过滤数字，及一些常用键(<10)，及Ctrl
        if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
            EventUtil.preventDefault(event);
        };
    }); 
    
    // 自动切换焦点
    (function(){
        
        function tabForward(event) {
          event = EventUtil.getEvent(event);
          var target = EventUtil.getTarget(event);
          // 条件：输入框内容达到最大限制时
          if(target.value.length == target.maxLength) {
            var form = document.getElementById('myFormB');
            for (var i=0, len = form.elements.length; i<len; i++) {
                // 条件：遍历到当前输入框时
                if (form.elements[i] == target) {
                    // 条件：存在下一个输入框
                    if(form.elements[i+1]) {
                        // 执行：将焦点切换到下一个输入框
                        form.elements[i+1].focus();
                        console.log(i+1);
                    }
                    console.log('autoswitch return')
                    // 返回
                    return;
                }
            }
          }
        };
        
        var textbox1 = document.getElementById('txtTel1');
        var textbox2 = document.getElementById('txtTel2');
        var textbox3 = document.getElementById('txtTel3');
        
        EventUtil.addHandler(textbox1, "keyup", tabForward);
        EventUtil.addHandler(textbox2, "keyup", tabForward);
        EventUtil.addHandler(textbox3, "keyup", tabForward);
    })();
    
    // 特性检测，是否支持email
    (function(){
        
        var input = document.createElement('input');
        input.type = "email";
        
        var isEmailSupported = (input.type == "email");
        console.log(isEmailSupported);
        
    })();
    


})(window, window.document);