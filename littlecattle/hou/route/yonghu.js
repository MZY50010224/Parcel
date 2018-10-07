var Token=require("../model/token.js")
var zhao=async function(ctx) {
    var max=ctx.request.body.max
    var x={
        o:0
    }
    var result={
        errCode:0
    }
    x.o=await Token.find({
        overtime:max
    })
    if(!x.o){
        result.errCode=1
        result.errMsg="没有该数据"
        ctx.body=result
        return
    }else{
        result.errCode=0
        result.errMsg="找到了"
        ctx.body=x
    }
}
module.exports=zhao