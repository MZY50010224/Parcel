var Ding=require("../model/ding.js")
var dingdan=async function(ctx) {
    var goodsname=ctx.request.body.goodsname
    var goodsprice=ctx.request.body.goodsprice
    var goodscolor=ctx.request.body.goodscolor
    var goodsjieshao=ctx.request.body.goodsjieshao
    var goodsnum=ctx.request.body.goodsnum //获取前台数据
    var goodsimg=ctx.request.body.goodsimg
    var result={
        errCode:0
    }

    var dingdanlie=new Ding({
        goodsname:goodsname,
        goodscolor:goodscolor,
        goodsprice:goodsprice,
        goodsjieshao:goodsjieshao,
        goodsnum:goodsnum,
        goodsimg:goodsimg
    })

    try{
        var cunchu=await dingdanlie.save()
    }catch(e){
        console.log(e)
        return
    }
    result.errCode=0
    result.errMsg="购买成功"
    ctx.body=result
}
module.exports=dingdan