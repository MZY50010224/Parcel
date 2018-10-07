var Goods=require("../model/goods.js")
//既然没有要获取的前端数据，那么就直接从后端找，找到返给前端，没有返回相应信息
var goodslist=async function(ctx) {
    var zheng=await Goods.find({goodstype:"zheng"})
    var ling=await Goods.find({goodstype:"ling"})
    var result={
        errCode:0
    }
    if(!zheng&&!ling){
        result.errCode=1
        result.errMsg="没有找到数据"
        ctx.body=result
        return
    }else{
        result.errCode=0
        result.errMsg="成功获取数据"
        result.list={type1:zheng,type2:ling}
        ctx.body=result
    }
    
}
module.exports=goodslist