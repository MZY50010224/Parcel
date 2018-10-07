var Shou=require("../model/shoucang.js")
var shoucangjia=async function(ctx) {
    //获取前端传值，并做判断，如果后端有，则不存，提示已有，如后端没有，则存入，并返回成功信息
    var goodsname=ctx.request.body.goodsname
    var goodsprice=ctx.request.body.goodsprice
    var goodsimg=ctx.request.body.goodsimg
    var goodscolor=ctx.request.body.goodscolor
    var result={
        errCode:0
    }

    var zhao=await Shou.findOne({
        goodsname:goodsname
    })
    if(!zhao){//没有，直接存
        var shou=new Shou({
            goodsname:goodsname,
            goodsprice:goodsprice,
            goodsimg:goodsimg,
            goodscolor:goodscolor
        })
        try{
            var cun=await shou.save()
            result.errCode=0
            result.errMsg="收藏成功"
            ctx.body=result
        }catch(e){
            console.log(e)
        }
    }else{//有，提示已有
        result.errCode=1
        result.errMsg="该物品已在收藏夹"
        ctx.body=result
    }
}
module.exports=shoucangjia