$(function(){
    var x=window.location.search//获取之前页面问号传参参数
    var urll=x.substr(1)//截取字符串有用字段
    var num=0
    $("#prev").on("click",function(){
        window.location.href="./main.html"
    })
    $("#jian").on("click",function(){
        num=num-1
        // console.log(num)
        if(num<=0){
            num=0
        }  
        $("#num").val(num)
        // console.log($("#price").text().replace(/[^0-9]/ig,""))
        var qian=$("#price").text().replace(/[^0-9]/ig,"")
        $("#heji").text("合计:"+$("#num").val()*qian)
    })
    $("#zeng").on("click",function(){
            num=num+1
            // console.log(num)
            $("#num").val(num)
            var qian=$("#price").text().replace(/[^0-9]/ig,"")
            $("#heji").text("合计:"+$("#num").val()*qian)
        })
    $.ajax({
        type:"post",
        url:url+"xiang",
        async:true,
        data:{
            urll:urll//用获取的问号传参参数goodsname来传入后台，在后台到服务器找到对应数据渲染到前端页面
        },
        success:function(data){
            console.log(data.img)
            $("#img").append("<img id="+data.goods.goodsimg+" src=img/"+data.goods.goodsimg+">")
            $("#name").text("名称:"+data.goods.goodsname)
            $("#price").text("价格:"+data.goods.goodsprice)
            $("#color").text("颜色:"+data.goods.goodscolor)
            $("#jie").text("介绍:"+data.goods.goodsjieshao)
            $("#shoucang").append("<img src='img/"+data.img+"'>")
        }
    })
    //购物车功能，在详情页点击购物车，发送ajax请求，将该商品信息传至后端存储，后台可进行操作
    //在这个页面获取dom中信息
   
    $("#gouwu").on("click",function(){
        var namee=$("#name").text()
        var pricee=$("#price").text()
        var colore=$("#color").text()
        var jiee=$("#jie").text()
        var nume=$("#num").val()
        var img=$("#img img").attr("id")

        var name=namee.substr(3)
        var price=pricee.substr(3)
        var color=colore.substr(3)
        var jie=jiee.substr(3)
        var num=parseInt(nume)  

        console.log(name+price+color+jie+num)
        $.ajax({
            type:"post",
            url:url+"gouwuche",
            async:true,
            data:{
                goodsname:name,
                goodsprice:price,
                goodscolor:color,
                goodsjieshao:jie,
                goodsnum:num,
                goodsimg:img
            },
            success:function(data){
                console.log(data)
                    $("#xianshi").css("display","block")
                    $("#xianshi").text(data.errMsg)
                    setTimeout(function(){
                        $("#xianshi").css("display","none")
                    },2000)
            }
        })
    })



    $("#now").on("click",function(){
        //立即购买功能，弹出选框选择支付方式，然后确认支付成功，添加进数据库，即订单页面，取消则取消，不发送请求
        $("#zhifu").css("display","block")
        $("#z").on("click",function(){
            $("#zhifu").css("display","none")
        })
    })
    $("#blue").on("click",function(){
        var namee=$("#name").text()
        var pricee=$("#price").text()
        var colore=$("#color").text()
        var jiee=$("#jie").text()
        var nume=$("#num").val()
        var img=$("#img img").attr("id")

        var name=namee.substr(3)
        var price=pricee.substr(3)
        var color=colore.substr(3)
        var jie=jiee.substr(3)
        var num=parseInt(nume) 

        $.ajax({//发送订单信息
            type:"post",
            url:url+"dingdan",
            async:true,
            data:{
                goodsname:name,
                goodsprice:price,
                goodscolor:color,
                goodsjieshao:jie,
                goodsnum:num,
                goodsimg:img
            },
            success:function(data){
                console.log(data)
                if(data.errCode==0){
                    $("#xianshi").css("display","block")
                    $("#xianshi").text(data.errMsg)
                    setTimeout(function(){
                        $("#xianshi").css("display","none")
                    },2000)
                    setTimeout(function(){
                        $("#zhifu").css("display","none")
                    },10)
                }else{
                    $("#xianshi").css("display","block")
                    $("#xianshi").text(data.errMsg)
                    setTimeout(function(){
                        $("#xianshi").css("display","none")
                    },1000)
                }
            }
        })
    })


    $("#shoucang").on("click",function(){
        var namee=$("#name").text()
        var pricee=$("#price").text()
        var colore=$("#color").text()
        var img=$("#img img").attr("id")
        console.log("p")

        var name=namee.substr(3)
        var price=pricee.substr(3)
        var color=colore.substr(3)

        $.ajax({
            type:"post",
            url:url+"shoucangjia",
            async:true,
            data:{
                goodsname:name,
                goodsprice:price,
                goodscolor:color,
                goodsimg:img
            },
            success:function(data){
                console.log(data)
            }
        })
    })
})
//点击发出ajax请求，发送id，成功跳转详情页，