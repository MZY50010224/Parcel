var Shou=require("../model/shoucang.js")
var Gouwu=require("../model/gouwu.js")
var Token=require("../model/token.js")
var zong=async function(ctx) {
    var zui={
        zong:0,
        zon:0,
        zo:0
    };
    zui.zong=await Shou.find()   
    zui.zon=await Gouwu.find()
    zui.zo=await Token.find()
    ctx.body=zui
}
module.exports=zong
