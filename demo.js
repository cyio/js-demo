var report = (function(){
  var imgs = [];
  
  return function(src){
    var img = new Image();
    imgs.push(img);
    img.src = src;
  }
})();

report('https://baidu.com')