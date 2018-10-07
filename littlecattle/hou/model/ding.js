var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var Dingschema=new Schema({
    goodsname:{type:String},
    goodsprice:{type:String},
    goodscolor:{type:String},
    goodsjieshao:{type:String},
    goodsnum:{type:Number},
    goodsimg:{type:String}
})
module.exports=mongoose.model("Ding",Dingschema)