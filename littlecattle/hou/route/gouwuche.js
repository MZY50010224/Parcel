var Gouwu=require("../model/gouwu.js")
var gouwuche=async function(ctx) {
    var goodsname=ctx.request.body.goodsname
    var goodsprice=ctx.request.body.goodsprice
    var goodscolor=ctx.request.body.goodscolor
    var goodsjieshao=ctx.request.body.goodsjieshao
    var goodsnum=ctx.request.body.goodsnum
    var goodsimg=ctx.request.body.goodsimg
    var result={
        errCode:0
    }
    //将获取前端的数据存入后台，之后收藏夹调用显示
    var shoucanga=new Gouwu({
        goodsname:goodsname,
        goodsprice:goodsprice,
        goodscolor:goodscolor,
        goodsjieshao:goodsjieshao,
        goodsnum:goodsnum,
        goodsimg:goodsimg
    })
    var gaishuju=await Gouwu.findOne({
        goodsname:goodsname
    })//去后台找这个东西(如果有，让其数量增加，如果没有，新加)
    if(!gaishuju){//没有，直接存
        try{
        var shoucangla=await shoucanga.save()
        result.errCode=0
        result.errMsg="加入购物车成功"
        ctx.body=result
    }catch(e){
        console.log(e)
        return
    }
    }else{//有，让其数量加一
        var goodsshu=await Gouwu.findOne({
            goodsnum:{$gte:0},//由于每次来获取商品数量，每次这里改变，前端改变，很难和后台统一，所以用固定值来查询会出错，但是可以用范围查询
            //来查询大于或等于一定值的值
            goodsname:goodsname
        })
        // console.log(goodsshu)
        // console.log(goodsshu.goodsnum)
        var goodsshuliang=parseInt(goodsshu.goodsnum)+parseInt(goodsnum)
        console.log(goodsshuliang)
        try{
            var shoucanglaa=await Gouwu.update(
                {goodsname:goodsname,},
                {//更新需要指定文档更新
                goodsprice:goodsprice,
                goodscolor:goodscolor,
                goodsimg:goodsimg,
                goodsjieshao:goodsjieshao,
                goodsnum:goodsshuliang})
                result.errCode=0
                result.errMsg="加入购物车成功+1"
                ctx.body=result
        }catch(e){
            console.log(e)
            return
        }
        
        
    }
    
    
}
module.exports=gouwuche