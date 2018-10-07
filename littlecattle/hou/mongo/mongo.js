var mongoose=require("mongoose")
DB_URL="mongodb://localhost:27017/user"
mongoose.Promise=global.Promise
mongoose.connect(DB_URL)
mongoose.connection.on("connected",function(){
    console.log("success")
})
mongoose.connection.on("error",function(error){
    console.log("err")
})
mongoose.connection.on("disconnect",function(){
    console.log("释放链接成功")
})
module.exports=mongoose
