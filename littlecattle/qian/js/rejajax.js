$(function(){
    $("#reg").click(function(){
        if($("#username").val().length>12||$("#username").val().length<6){
            $("#username").css("border","1px solid red")
            $("#text1").text("用户名格式不正确")
        }else if($("#password").val().length>12||$("#password").val().length<6){
            $("#password").css("border","1px solid red")
            $("#text2").text("密码格式不正确")
        }else if($("#password2").val()!==$("#password").val()){
            $("#password2").css("border","1px solid red")
            $("#text3").text("两次密码不一致")
        }else if($("#usertel").val().length==0){
            $("#usertel").css("border","1px solid red")
            $("#text4").text("请输入手机号")
        }else{
            $.ajax({
                type:"post",
                url:url+"reg",
                datatype:"json",
                async:true,
                data:{
                    username:$("#username").val(),
                    password:$("#password").val(),
                    usertel:$("usertel").val()
                },
                success:function(data){
                    console.log(data)
                    $("#move").css("display","block")
                    $("#move").text(data.errMsg)
                    setTimeout(function(){
                        $("#move").css("display","none")
                        location.href="login.html"
                    },2000)
                }
            })
    }
    })
    
})