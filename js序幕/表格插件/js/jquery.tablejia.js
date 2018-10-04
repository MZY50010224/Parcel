;(function ($) {
    var _that;
    var e;//声明一个事件对象用于存储用户自定义事件,让更多的地方可以访问到config

    function _tablejia(config) {
        _that=this//第一时间存储this，指向调用函数的对象

        var deg={"url":"./test.json"}//定义默认值
        var setting=$.extend({},deg,config)//对象合并，用户传值与否的折中办法
        delete config.url//在用完属性后将其删除，便于后面对对象的遍历
        e=config//将剩余的对象中的事件存至e变量中

        var iframe=$('<iframe src="'+setting.url+'" style="display:none"></iframe>').appendTo("body")//在页面中插入iframe标签，并且其中数据传进
        iframe.on("load",function () {//当标签加载完成时获取其中内容
            var data=$(this.contentDocument).find("body").text()
            console.log(data)
            data=JSON.parse(data)//将获取的字符串格式的内容转为json格式

            datajion(data)//调用方法将对象拆分拼接后输出至页面table中
        })

        return _that
    }

    function datajion(data){//上文提到的方法
        var html=""
        for(var i in data){

            html+="<tr>"
            html+="<td>"+data[i].name+"</td>"
            html+="<td>"+data[i].age+"</td>"
            html+="<td>"+data[i].run+"</td>"
            html+="<td>"+data[i].jjj+"</td>"
            html+="</tr>"
        }
        _that.html(html)
        //最好页面渲染完毕后再绑事件，这样不容易出错
        addevent()//绑定用户自定义事件的函数
    }


    function addevent(){
        /*
            事件三要素：事件源，事件类型，事件处理函数
            事件源：_that=>tr
            事件类型：e.键名
            事件处理函数：e.键值
            绑定函数：_that.on("k","tr",e.k)
         */
        $.each(e,function (i,v) {
            $(_that).on(i,"tr",v)//通过遍历传入的参数得到函数类型和函数执行代码
        })//从而绑定
    }

    $.fn.tablejia=_tablejia//挂至jquery上
    // 保证$始终指向jquery
})(jQuery);