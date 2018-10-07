$(function(){
    $("#geren>button").on("click",function(){
        window.location.href="./login.html"
    })
    $.ajax({
        type:"post",
        url:url+"main",
        async:true,
        success:function(data){
            console.log(data)
            console.log(data.list.type1[0].goodsimg)
            for(var i=0;i<data.list.type1.length;i++){
                (function(i){
                    $("#zheng").append("<img id="+data.list.type1[i].goodsname+" src=img/"+data.list.type1[i].goodsimg+">")
                })(i)
            }
            for(var j=0;j<data.list.type2.length;j++){
                (function(j){
                    $("#pei").append("<img id="+data.list.type2[j].goodsname+" src=img/"+data.list.type2[j].goodsimg+">")
                })(j)
            }
        }
    })

    $.ajax({
        //获取订单列表
        type:"post",
        url:url+"huoding",
        async:true,
        success:function(data){
            console.log(data)//记住nth-child（）子元素选择器，序号是从第一个子元素开始的，不是从零开始的，你要选择的该标签是第几个孩子，就怎么写序号,例：第一个p标签p:nth-child(0)
            console.log(data[0].goodsname)
            for(var i=0;i<data.length;i++){
                $("#sec2").append("<div id="+data[i].goodsname+"><img src=img/"+data[i].goodsimg+"><p>"+data[i].goodsname+"</p><p>"+data[i].goodsprice+"</p><p>"+data[i].goodscolor+"</p><p>"+data[i].goodsnum+"</p></div>")
            }
        }
    })
    $("#sec2").on("click","div",function(){
        window.location.href="./xiang.html?"+this.id
        
    })//订单列表点击进入详情页

    $.ajax({//显示收藏夹信息
        type:"post",
        url:url+"xianshou",
        async:true,
        success:function(data){
            console.log(typeof(data.zo[0].overtime))
            console.log(data)
            var arr=[]
            for(var i=0;i<data.zo.length;i++){
                arr.push(data.zo[i].overtime)
            }
            var max=arr.sort(function(a,b){
                return b-a
            })[0]
            console.log(max)
            console.log(arr)
            $("#sec3>div:nth-child(3)>p:nth-child(2)").text(data.zong.length)
            $("#sec3>div:nth-child(4)>p:nth-child(2)").text(data.zon.length)
            $.ajax({
                type:"post",
                url:url+"yonghu",
                async:true,
                data:{
                    max:max
                },
                success:function(data){
                    console.log(data.o[0].username)
                    $("#sec3>div:nth-child(2)>p:nth-child(2)").text(data.o[0].username)
                }
            })
        }
    })




    $("#zheng").on("click","img",function(event){
        console.log(this.id)
        window.location.href="./xiang.html?"+this.id//通过问号传参，跳转其他页面，并在其他页面获取传参内容
    })
    $("#pei").on("click","img",function(event){
        console.log(this.id)
        window.location.href="./xiang.html?"+this.id//通过问号传参，跳转其他页面，并在其他页面获取传参内容
    })

    //控制主页主要部分显示情况
    // $("#foo11").on("click",function(){

    //     $("#sec").css("display","block")
    // })
    $("#foo1").on("click",function(){
        $("#sec").css("display","block")
        $("#sec2").css("display","none")
        $("#sec3").css("display","none")
        // console.log("9")
    })
    $("#foo3").on("click",function(){
        $("#sec").css("display","none")
        $("#sec3").css("display","none")
        $("#sec2").css("display","block")
        // console.log("9")
    })
    $("#foo4").on("click",function(){
        $("#sec").css("display","none")
        $("#sec2").css("display","none")
        $("#sec3").css("display","block")
        // console.log("9")
    })
    //第一个列表应该是自动加载，默认显示
})