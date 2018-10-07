;(function ($) {
    var _that;
    var e;
    var index=0;
    var ooo=0;
    var olli

    function _lunbo(config){
        _that=this//首先将this存起来，保证始终指向调用该函数的对象

// console.log(config)
        $(_that).css("width",config.width)
        $(_that).css("height",config.height)
        delete config.width
        delete config.height//用完后删除两个属性，方便之后遍历
        // console.log(config)
        e=config//挂在外面，方便其他函数访问

        for(var i in config){

            $("<li></li>").attr("style","background-image:url("+config[i]+")").attr("che",i).appendTo("ul")//在ul中添加轮播的li标签

        }//遍历用户传值，生成轮播图内容

        var ulli=$(_that).find("[che]")//让第一张在中间，其余的到右边就位


        for(var i=0;i<ulli.length;i++){
            $("<li></li>").attr("indec",ooo).appendTo("ol")//在ol中生成li标签
            ooo++
        }

        // console.log(ulli[0])
        var w=$(ulli[0]).css("width")
        $(ulli[0]).css("left","0")
        for(var j=1;j<ulli.length;j++){
            $(ulli[j]).css("left",w)
        }//已就位


        $("#left").on("click",function () {
            // alert("left")
            //让当前图片做动画右移
            //让上一张即要被传入的图片直接移到左边
            //让上一张做动画由左移进
            slower($(ulli[index])[0],{"left":w})
            index--
            if(index<0){
                index=ulli.length-1
            }
            $(ulli[index])[0].style.left="-"+w
            slower($(ulli[index])[0],{"left":0})
            changeindex()
        })//点击左键

        $("#right").on("click",function () {
            slower($(ulli[index])[0],{"left":"-"+w})//-作为一个字符串要加引号
            // console.log(-w)
            index++
            if(index>ulli.length-1){
                index=0
            }
            $(ulli[index])[0].style.left=w
            slower($(ulli[index])[0],{"left":0})
            changeindex()
        })//点击右键



        olli=$(_that).find("[indec]")


        for(var i=0;i<olli.length;i++){//遍历ol中li标签并绑定事件
            // console.log("p")
            $(olli)[i].onclick=function () {
                // console.log($(this).attr("indec"))
                if($(this).attr("indec")>index){
                    slower($(ulli[index])[0],{"left":w})
                    index=$(this).attr("indec")
                    $(ulli[index])[0].style.left=-w
                    slower($(ulli[index])[0],{"left":0})
                    changeindex()
                }else if($(this).attr("indec")<index){
                    slower($(ulli[index])[0],{"left":w})
                    index=$(this).attr("indec")
                    $(ulli[index])[0].style.left=w
                    slower($(ulli[index])[0],{"left":0})
                    changeindex()
                }
            }
        }
        $(olli)[0].className="active"

        var timer=setInterval(set,2000)
        $(_that)[0].onmouseenter=function () {
            clearInterval(timer)
        }
        $(_that)[0].onmouseleave=function () {
            clearInterval(timer)
            timer=setInterval(set,1500)
        }
        function set() {
            slower($(ulli[index])[0],{"left":"-"+w})//-作为一个字符串要加引号
            // console.log(-w)
            index++
            if(index>ulli.length-1){
                index=0
            }
            $(ulli[index])[0].style.left=w
            slower($(ulli[index])[0],{"left":0})
            changeindex()
        }

        return _that//返回该对象，即jquery对象，避免链式操作找不到对象
    }
    function changeindex() {//绑定class
        for(var i=0;i<olli.length;i++){
            $(olli)[i].className=""
        }
        $(olli)[index].className="active"
    }




    $.fn.lunbo=_lunbo//挂至jquery上
})(jQuery);