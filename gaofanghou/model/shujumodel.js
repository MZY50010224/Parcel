var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var shujumodel=new Schema({
	seller:{type:Object},
	goods:{type:Array},
	ratings:{type:Array},
	name:{type:String}
})
module.exports=mongoose.model("Shu",shujumodel)
