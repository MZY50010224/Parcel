$(function(){
    $("#login").click(function(){
        $.ajax({
            type:"post",
            url:url+"login",
            async:true,
            data:{
                username:$("#username").val(),
                password:$("#password").val()
            },
            success:function(data){
                console.log(data)
                location.href="main.html"
            }
        })
    })


})