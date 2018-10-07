var User=require("../model/user.js")
var Token=require("../model/token.js")
var login=async function(ctx) {
    var username=ctx.request.body.username
    var password=ctx.request.body.password//获取前端传值
    var result={
        errCode:0
    }
    var user=await User.findOne({
        username:username,
        password:password
    })//在用户名集合中找东西
    if(!user){//没找到，则报错
        result.errCode=1
        result.errMsg="用户名或密码错误"
        ctx.body=result
        return
    }else{//用户名有了证明注册过，可以登录，先判断Token中有无该用户信息，有了更新，没有加进去
        var time=Date.now()
        var over=Date.now()+60*60*1000*24
        var tokenn=await Token.findOne({
            username:username,
            password:password
        })
        if(!tokenn){
            var token=new Token({
                username:username,
                password:password,
                gettime:time,
                overtime:over
            })
            try{
                token=await token.save()
            }catch(e){
                console.log(e)
                return
            }
            result.errCode=0
            result.errMsg="登陆成功"
            ctx.body=result
            console.log("新登陆")
            return
        }else{
            await Token.update({
            username:username,
            password:password,
            gettime:time,
            overtime:over
            })
            result.errCode=0
            result.errMsg="登陆成功"
            console.log("登陆过"+tokenn)
            ctx.body=result
        }
    }
}

module.exports=login