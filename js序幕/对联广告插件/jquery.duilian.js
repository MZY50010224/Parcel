;(function ($) {
    var _that;
    function _duilian(config) {
        _that=this;
        var leftad=$('<div><img src="'+config.leftimg+'"></div>').appendTo(_that)
        var rightad=$('<div><img src="'+config.rightimg+'"></div>').appendTo(_that)
        leftad.css({"position":"fixed","left":"20px","top":"100px"})
        rightad.css({"position":"fixed","right":"20px","top":"100px"})
        return _that
    }






    $.fn.duilian=_duilian

})(jQuery);