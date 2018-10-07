(function(){
    var designW = 1900;  //设计稿宽
    var font_rate = 100;
    //onorientationchange表示屏幕旋转，也是事件，并且会触发onresize事件
    //适配
    document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
    document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";

    //监测窗口大小变化
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
    document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
            }, false);
})();
