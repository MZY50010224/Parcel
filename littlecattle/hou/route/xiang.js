var Goods=require("../model/goods.js")
var Shou=require("../model/shoucang.js")
var xiang=async function(ctx) {
    var url=ctx.request.body.urll//获取前端传值，goodsname,现在有商品schema和goodsname,在数据库中找出对应的商品名，返回对应数据
    var result={
        errCode:0
    }
    var goods=await Goods.findOne({
        goodsname:url
    })
    if(!goods){
        result.errCode=1
        result.errMsg="未找到该商品"
        ctx.body=result
        return
    }else{
        var xun=await Shou.findOne({
            goodsname:url
        })
        if(!xun){
            result.img="收藏 (2).png"
        }else{
            result.img="收藏 (1).png"
        }
        result.errCode=0
        result.errMsg="找到该商品"//向前端返回数据是ctx.body
        result.goods=goods
        ctx.body=result

    }
}
module.exports=xiang