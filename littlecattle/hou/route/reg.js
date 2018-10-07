var User=require("../model/user.js")
var reg=async function(ctx) {
    var username=ctx.request.body.username
    var password=ctx.request.body.password
    var usertel=ctx.request.body.usertel
    var result={
        errCode:0
    }
    var user=await User.findOne({
        username:username
    })
    if(!user){
        user=new User({
            username:username,
            password:password,
            usertel:usertel
        })
        try{
            user=await user.save()
            result.errCode=0
            result.errMsg="注册成功"
            ctx.body=result
        }catch(e){
            console.log("err")
        }
    }else{
        result.errCode=1
        result.errMsg="该用户名已存在"
        ctx.body=result
        return
    }
    
}
module.exports=reg//要抛出的是reg,注意注意，这里是module.exports不要写反了！