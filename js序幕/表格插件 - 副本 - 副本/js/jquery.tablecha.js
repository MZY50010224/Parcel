;(function ($) {
    var _that;
    var e;

    function _tablecha(config) {
        _that=this
        //当用户调用插件时,根据数据生成表格,首先要通过iframe来将数据和传入页面
        var deg={"url":"./test.json"}
        var setting=$.extend({},deg,config)

        delete config.url
        e=config



        var iframe=$('<iframe src="'+setting.url+'" style="display: none"></iframe>').appendTo("body")
        iframe.on("load",function () {
            var data=$(this.contentDocument).find("body").text()
            // console.log(data)
            data=JSON.parse(data)

            datajion(data)
        })


        return _that
    }

    function datajion(data){
        var html=""
        for(var i in data){
            html+="<tr>"
            html+="<td>"+data[i].name+"</td>"
            html+="<td>"+data[i].age+"</td>"
            html+="<td>"+data[i].aihao+"</td>"
            html+="<td>"+data[i].eat+"</td>"
            html+="<td>"+data[i].daima+"</td>"
            html+="<td>"+data[i].yundong+"</td>"
            html+="</tr>"
        }
        $(_that).html(html)

        addevent()
    }

    function addevent(){
        for(var i in e){
            $(_that).on(i,"tr",e[i])//时间委派
        }
    }

    $.fn.tablecha=_tablecha
})(jQuery);