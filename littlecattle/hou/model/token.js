var mongoose=require("../mongo/mongo.js")
var Schema=mongoose.Schema
var Tokenschema=new Schema({
    username:{type:String},
    password:{type:String},
    gettime:{type:String},
    overtime:{type:String}
})
module.exports=mongoose.model("Token",Tokenschema)