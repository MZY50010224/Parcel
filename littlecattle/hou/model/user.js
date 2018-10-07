var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var Userschema=new Schema({
    username:{type:String},
    password:{type:String},
    usertel:{type:Number}
})
module.exports=mongoose.model("User",Userschema)