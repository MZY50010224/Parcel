var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var shouschema=new Schema({
    goodsname:{type:String},
    goodsimg:{type:String},
    goodsprice:{type:String},
    goodscolor:{type:String}
})
module.exports=mongoose.model("Shou",shouschema)