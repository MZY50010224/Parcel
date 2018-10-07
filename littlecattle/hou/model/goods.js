var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var goodsschema=new Schema({
    goodsname:{type:String},
    goodstype:{type:String},
    goodsprice:{type:Number},
    goodsimg:{type:String},
    goodsoften:{type:String},
    goodsjieshao:{type:String},
    goodscolor:{type:String}
})
module.exports=mongoose.model("Goods",goodsschema)