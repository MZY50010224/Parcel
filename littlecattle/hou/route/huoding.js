var Ding=require("../model/ding.js")
var huoding=async function(ctx) {
    var zongshu=await Ding.find()//可以找到全部数据
    //遍历全部数据
    ctx.body=zongshu
    console.log(zongshu)
}
module.exports=huoding