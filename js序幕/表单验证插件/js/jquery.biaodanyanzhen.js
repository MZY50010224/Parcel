;(function ($) {
    var _that;


    function _biaodanyanzhen() {
        _that=this
        _that.on("submit",function () {
            var flag=true;


            $(_that).find("[checke]").each(function (i,v) {//获取所有有自定义属性checke的元素并进行遍历
                //获取到要进行非空验证的元素
                var type=$(v).attr("checke")//将该对象里自定义属性的值赋值
                if(type==="feik"){//非空验证
                    if(v.value===""){
                        $(v).css("border","2px solid red")
                        flag=false
                    }else {
                        $(v).css("border","1px solid #ccc")
                    }
                }
                //正则表达式验证
                if(type==="reg"){
                    /*
                    正则表达式：
                            1：定义正则表达式：
                                var reg=new RegExp("....");
                                var reg=/.../img
                            2:使用正则表达式
                                reg.test(str)返回是否有与正则表达式匹配的值，true，false
                                reg.exec(str)获取正则表达式匹配到的值

                                str.match(reg)获取匹配到的值
                                str.split(reg)按正则表达式切割字符串
                                str.replace(reg,"")按正则表达式查询数据，替换成指定字符
                     */

                    var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    if(reg.test(v.value)){
                        $(v).css("border","1px solid #ccc")
                    }else {
                        $(v).css("border","2px solid red")
                        flag=false
                    }
                }
                //复杂判断
                if(type==="fuza"){
                    var fuza=$(v).attr("fuza").split("-")
                    if(v.value.length>=fuza[0]&&v.value.length<=fuza[1]){
                        $(v).css("border","1px solid #ccc")
                    }else {
                        $(v).css("border","2px solid red")
                        flag=false
                    }

                }
            })


            return flag
        })

        return _that
    }
    $.fn.biaodanyanzhen=_biaodanyanzhen
})(jQuery);